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
    }

    @GetMapping("/debug/group/{groupId}")
    public ResponseEntity<List<Object[]>> debugOwedAmount(@PathVariable Long groupId) {
        return ResponseEntity.ok(transactionService.debugTotalOwedPerUser(groupId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionDTO>> getUserTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getUserTransactions(userId));
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
