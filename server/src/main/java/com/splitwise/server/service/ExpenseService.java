package com.splitwise.server.service;

import com.splitwise.server.model.Expense;
import com.splitwise.server.repo.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepo repo;

    public List<Expense> getAllExpenses(){
        return repo.findAll();
    }

}
