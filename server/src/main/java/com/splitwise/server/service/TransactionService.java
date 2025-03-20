package com.splitwise.server.service;

import com.splitwise.server.dto.TransactionDTO;
import com.splitwise.server.model.Transaction;
import com.splitwise.server.model.User;
import com.splitwise.server.repo.TransactionRepo;
import com.splitwise.server.repo.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    public List<TransactionDTO> getUserTransactions(Long userId) {
        List<Transaction> transactions = transactionRepo.findByPayeeIdOrPayerId(userId, userId);

        return transactions.stream()
                .map(transaction -> new TransactionDTO(
                        transaction.getId(),
                        transaction.getPayer().getId(),
                        transaction.getPayer().getName(),
                        transaction.getPayee().getId(),
                        transaction.getPayee().getName(),
                        transaction.getAmount(),
                        transaction.getDate(),
                        transaction.getGroup().getId(),
                        transaction.getGroup().getName(),
                        transaction.isSettled()
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
}
