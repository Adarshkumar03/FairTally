package com.splitwise.server.service;

import com.splitwise.server.dto.OweDetailsDTO;
import com.splitwise.server.dto.TransactionDTO;
import com.splitwise.server.model.Transaction;
import com.splitwise.server.repo.TransactionRepo;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepo transactionRepo;

    public TransactionService(TransactionRepo transactionRepo) {
        this.transactionRepo = transactionRepo;
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

}
