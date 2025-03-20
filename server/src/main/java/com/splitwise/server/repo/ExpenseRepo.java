package com.splitwise.server.repo;

import com.splitwise.server.model.Expense;
import com.splitwise.server.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepo extends JpaRepository<Expense, Long> {
    List<Expense> findByGroup(Group group);
}
