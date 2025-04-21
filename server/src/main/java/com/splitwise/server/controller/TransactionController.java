package com.splitwise.server.controller;

import com.splitwise.server.dto.OweDetailsDTO;
import com.splitwise.server.dto.TransactionDTO;
import com.splitwise.server.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
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
    public ResponseEntity<String> settleTransaction(@PathVariable Long transactionId) {
        transactionService.settleTransaction(transactionId);
        return ResponseEntity.ok("Transaction settled successfully");
    }

    @GetMapping("/owe-details")
    public ResponseEntity<List<OweDetailsDTO>> getOweDetails(
            @RequestParam Long userId,
            @RequestParam Long groupId) {

        List<OweDetailsDTO> oweDetails = transactionService.getOweDetails(userId, groupId);
        return ResponseEntity.ok(oweDetails);
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<?> removeTransaction(@PathVariable Long transactionId) {

        try {
            transactionService.removeTransaction(transactionId);
            return ResponseEntity.ok(Map.of("message", "Transaction removed successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
