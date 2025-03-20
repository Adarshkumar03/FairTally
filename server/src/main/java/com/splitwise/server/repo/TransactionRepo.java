package com.splitwise.server.repo;

import com.splitwise.server.model.Transaction;
import com.splitwise.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    List<Transaction> findByPayerOrPayee(User user, User user1);

    List<Transaction> findByPayeeIdOrPayerId(Long userId, Long userId1);
}
