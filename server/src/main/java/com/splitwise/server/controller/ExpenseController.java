package com.splitwise.server.controller;

import com.splitwise.server.dto.ExpenseRequestDTO;
import com.splitwise.server.dto.ExpenseResponseDTO;
import com.splitwise.server.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponseDTO>> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<ExpenseResponseDTO>> getExpensesForGroup(@PathVariable Long groupId) {
        return ResponseEntity.ok(expenseService.getExpensesForGroup(groupId));
    }

    @PostMapping
    public ResponseEntity<ExpenseResponseDTO> addExpense(@RequestBody ExpenseRequestDTO expenseRequestDTO) {
        ExpenseResponseDTO createdExpense = expenseService.addExpense(expenseRequestDTO);
        return ResponseEntity.ok(createdExpense);
    }
}
