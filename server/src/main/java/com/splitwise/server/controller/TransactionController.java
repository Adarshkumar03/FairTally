package com.splitwise.server.controller;

import com.splitwise.server.dto.OweDetailsDTO;
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
        System.out.println("✅ TransactionController initialized!");
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<TransactionDTO>> getUserTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getUserTransactions(userId));
    }

    @GetMapping("/groups/{groupId}")
    public ResponseEntity<List<TransactionDTO>> getGroupTransactions(@PathVariable Long groupId) {
        System.out.println("Fetching transactions for group ID: " + groupId);
        List<TransactionDTO> transactions = transactionService.getGroupTransactions(groupId);
        return ResponseEntity.ok(transactions);
    }

    @PutMapping("/{transactionId}/settle")
    public Transaction settleTransaction(@PathVariable Long transactionId) {
        return transactionService.markTransactionAsSettled(transactionId);
    }

    @GetMapping("/owe-details")
    public ResponseEntity<List<OweDetailsDTO>> getOweDetails(
            @RequestParam Long userId,
            @RequestParam Long groupId) {

        List<OweDetailsDTO> oweDetails = transactionService.getOweDetails(userId, groupId);
        return ResponseEntity.ok(oweDetails);
    }
}
