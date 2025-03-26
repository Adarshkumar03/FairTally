package com.splitwise.server.service;

import com.splitwise.server.dto.OweDetailsDTO;
import com.splitwise.server.dto.TransactionDTO;
import com.splitwise.server.dto.UserDTO;
import com.splitwise.server.dto.UserDebtDTO;
import com.splitwise.server.model.Transaction;
import com.splitwise.server.repo.TransactionRepo;
import com.splitwise.server.repo.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public List<OweDetailsDTO> getDebtsForUser(Long userId, Long groupId) {
        List<Object[]> results = transactionRepo.findDebtsByUser(userId, groupId);

        return results.stream()
                .map(row -> new OweDetailsDTO(
                        (Long) row[0],  // payeeId
                        (String) row[1],  // payeeName
                        (BigDecimal) row[2] // amountOwed
                ))
                .collect(Collectors.toList());
    }

    public void settleTransaction(Long transactionId) {
        Transaction transaction = transactionRepo.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setSettled(true);
        transactionRepo.save(transaction);
    }

//    public BigDecimal getTotalOwedByUser(Long userId, Long groupId) {
//        return transactionRepo.getTotalOwedByUser(userId, groupId).orElse(BigDecimal.ZERO);
//    }

    public List<UserDTO> getTotalOwedPerUser(Long groupId) {
        List<Object[]> results = transactionRepo.getTotalOwedPerUser(groupId);

        return results.stream()
                .map(row -> new UserDTO(
                        ((Number) row[0]).longValue(),  // User ID
                        (String) row[1],                // User Name
                        (BigDecimal) row[2]             // Total Owed
                ))
                .collect(Collectors.toList());
    }

    public List<Object[]> debugTotalOwedPerUser(Long groupId) {
        List<Object[]> results = transactionRepo.getTotalOwedPerUser(groupId);

        // Debugging: Print raw results
        for (Object[] row : results) {
            System.out.println("User ID: " + row[0] + ", Name: " + row[1] + ", Total Owed: " + row[2]);
        }

        return results;
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


    @Transactional
    public Transaction markTransactionAsSettled(Long transactionId) {
        Transaction transaction = transactionRepo.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (transaction.isSettled()) {
            throw new RuntimeException("Transaction is already settled.");
        }

        transaction.setSettled(true);
        return transactionRepo.save(transaction);
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
                        t.isSettled()
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
                        t.isSettled()
                ))
                .collect(Collectors.toList());
    }
}
