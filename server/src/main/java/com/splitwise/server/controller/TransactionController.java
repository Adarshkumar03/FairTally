package com.splitwise.server.controller;

import com.splitwise.server.dto.TransactionDTO;
import com.splitwise.server.model.Transaction;
import com.splitwise.server.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionDTO>> getUserTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getUserTransactions(userId));
    }

    @PutMapping("/{transactionId}/settle")
    public Transaction settleTransaction(@PathVariable Long transactionId) {
        return transactionService.markTransactionAsSettled(transactionId);
    }
}
