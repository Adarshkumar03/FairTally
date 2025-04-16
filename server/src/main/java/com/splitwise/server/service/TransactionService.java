package com.splitwise.server.service;

import com.splitwise.server.dto.FriendExpenseRequest;
import com.splitwise.server.dto.FriendExpenseResponse;
import com.splitwise.server.dto.OweDetailsDTO;
import com.splitwise.server.dto.TransactionDTO;
import com.splitwise.server.model.Transaction;
import com.splitwise.server.model.User;
import com.splitwise.server.repo.TransactionRepo;
import com.splitwise.server.repo.UserRepo;
import org.springframework.stereotype.Service;

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
                        ((Number) row[1]).longValue(), // payer_id
                        (String) row[2],              // payer_name
                        (BigDecimal) row[0]           // total_owed
                ))
                .collect(Collectors.toList());
    }


    public List<TransactionDTO> getGroupTransactions(Long groupId) {
        List<Transaction> transactions = transactionRepo.findByGroupIdAndSettledFalse(groupId);
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
        List<Transaction> transactions = transactionRepo.findByUserIdAndSettledFalse(userId);
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

    public List<FriendExpenseResponse> getFriendExpenses(Long userId, Long friendId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        User friend = userRepo.findById(friendId)
                .orElseThrow(() -> new IllegalArgumentException("Friend not found"));

        List<Transaction> transactions = transactionRepo.findByPayerAndPayee(user, friend);

        return transactions.stream()
                .map(tx -> new FriendExpenseResponse(
                        tx.getId(),
                        tx.getPayer().getName(),
                        tx.getPayee().getName(),
                        tx.getAmount(),
                        tx.getDescription(),
                        tx.getDate(),
                        tx.isSettled()
                ))
                .collect(Collectors.toList());
    }

}
