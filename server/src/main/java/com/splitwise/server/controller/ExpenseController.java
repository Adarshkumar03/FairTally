package com.splitwise.server.controller;

import com.splitwise.server.model.Expense;
import com.splitwise.server.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExpenseController {
    @Autowired
    ExpenseService service;

    @GetMapping("/expenses")
    public List<Expense> getAllExpenses(){
        return service.getAllExpenses();
    }
}
