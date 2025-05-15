package com.splitwise.server.service;

import com.splitwise.server.dto.*;
import com.splitwise.server.model.Transaction;
import com.splitwise.server.model.User;
import com.splitwise.server.repo.TransactionRepo;
import com.splitwise.server.repo.UserRepo;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepo transactionRepo;
    private final UserRepo userRepo;

    public TransactionService(TransactionRepo transactionRepo, UserRepo userRepo) {
        this.transactionRepo = transactionRepo;
        this.userRepo = userRepo;
    }

    public void settleTransaction(Long transactionId) {
        Transaction transaction = transactionRepo.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setSettled(true);
        transactionRepo.save(transaction);
    }

    public List<OweDetailsDTO> getOweDetails(Long userId, Long groupId) {
        return transactionRepo.getOweDetails(userId, groupId).stream()
                .map(row -> new OweDetailsDTO(
                        ((Number) row[1]).longValue(),
                        (String) row[2],
                        (BigDecimal) row[0]
                ))
                .collect(Collectors.toList());
    }


    public List<TransactionDTO> getGroupTransactions(Long groupId) {
        List<Transaction> transactions = transactionRepo.findByGroupId(groupId);
        return transactions.stream()
                .map(t -> new TransactionDTO(
                        t.getId(),
                        t.getPayer().getId(),
                        t.getPayer().getName(),
                        t.getPayee().getId(),
                        t.getPayee().getName(),
                        t.getAmount(),
                        t.getDate(),
                        t.getGroup().getId(),
                        t.getGroup().getName(),
                        t.isSettled(),
                        t.getDescription()
                ))
                .collect(Collectors.toList());
    }


    public List<TransactionDTO> getUserTransactions(Long userId) {
        List<Transaction> transactions = transactionRepo.findByUserId(userId);
        return transactions.stream()
                .map(t -> new TransactionDTO(
                        t.getId(),
                        t.getPayer().getId(),
                        t.getPayer().getName(),
                        t.getPayee().getId(),
                        t.getPayee().getName(),
                        t.getAmount(),
                        t.getDate(),
                        t.getGroup() != null ? t.getGroup().getId() : null,
                        t.getGroup() != null ? t.getGroup().getName() : null,
                        t.isSettled(),
                        t.getDescription()
                ))
                .collect(Collectors.toList());
    }

    public void addFriendExpense(Long userId, Long friendId, FriendExpenseRequest request) {
        User payer = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Payer not found"));

        User payee = userRepo.findById(friendId)
                .orElseThrow(() -> new IllegalArgumentException("Friend not found"));

        if (payer.getId().equals(payee.getId())) {
            throw new IllegalArgumentException("Cannot add expense with yourself");
        }

        Transaction transaction = new Transaction();
        transaction.setPayer(payer);
        transaction.setPayee(payee);
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setGroup(null);
        transaction.setSettled(false);
        transaction.setType(Transaction.TransactionType.FRIEND);
        transactionRepo.save(transaction);
    }

    public List<FriendExpenseResponse> getFriendTransactions(Long userId, Long friendId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        User friend = userRepo.findById(friendId)
                .orElseThrow(() -> new IllegalArgumentException("Friend not found"));

        List<Transaction> transactions = transactionRepo.findByUsersInFriendContext(user, friend);

        return transactions.stream()
                .map(tx -> new FriendExpenseResponse(
                        tx.getId(),
                        tx.getPayer().getId(),
                        tx.getPayee().getId(),
                        tx.getPayer().getName(),
                        tx.getPayee().getName(),
                        tx.getAmount(),
                        tx.getDescription(),
                        tx.getDate(),
                        tx.isSettled()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeTransaction(Long transactionId){
        Transaction tx = transactionRepo.findById(transactionId).orElseThrow(() -> new IllegalArgumentException("Transaction not found"));
        transactionRepo.deleteById(transactionId);
    }

    public void updateTransaction(Long transactionId, TransactionUpdateDTO transactionUpdateDTO) {
        Transaction existingTransaction = transactionRepo.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        User payee = userRepo.findById(transactionUpdateDTO.getPayeeId())
                .orElseThrow(() -> new IllegalArgumentException("Payee not found"));

        User payer = userRepo.findById(transactionUpdateDTO.getPayerId())
                .orElseThrow(() -> new IllegalArgumentException("Payer not found"));

        existingTransaction.setAmount(transactionUpdateDTO.getAmount());
        existingTransaction.setDescription(transactionUpdateDTO.getDescription());
        existingTransaction.setPayer(payer);
        existingTransaction.setPayee(payee);

        Transaction updatedTransaction = transactionRepo.save(existingTransaction);
    }

    public UserSummaryDTO getUserSummary(Long userId) throws Exception {
        BigDecimal totalOwes = transactionRepo.findTotalOwedByUser(userId);
        BigDecimal totalOwedTo = transactionRepo.findTotalOwedToUser(userId);
        BigDecimal netBalance = totalOwedTo.subtract(totalOwes);

        if (totalOwes == null) {
            throw new Exception("Error fetching transaction totals for user ID: " + userId);
        }

        Pageable topFive = (Pageable) PageRequest.of(0, 5);

        List<Transaction> transactions = transactionRepo.last5Transactions(userId, topFive);

        if (transactions == null || transactions.isEmpty()) {
            throw new Exception("No recent transactions found for user ID: " + userId);
        }

        List<TransactionDTO> transactionDTOs = transactions.stream()
                .map(tx -> new TransactionDTO(
                        tx.getId(),
                        tx.getPayer().getId(),
                        tx.getPayer().getName(),
                        tx.getPayee().getId(),
                        tx.getPayee().getName(),
                        tx.getAmount(),
                        tx.getDate(),
                        tx.getGroup() != null ? tx.getGroup().getId() : null,
                        tx.getGroup() != null ? tx.getGroup().getName() : null,
                        tx.isSettled(),
                        tx.getDescription()
                ))
                .collect(Collectors.toList());

        return new UserSummaryDTO(totalOwes, totalOwedTo, netBalance, transactionDTOs);
    }

}
