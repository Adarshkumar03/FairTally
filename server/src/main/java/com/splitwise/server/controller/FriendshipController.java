package com.splitwise.server.controller;

import com.splitwise.server.dto.FriendExpenseRequest;
import com.splitwise.server.dto.FriendExpenseResponse;
import com.splitwise.server.model.Transaction;
import com.splitwise.server.model.User;
import com.splitwise.server.service.FriendshipService;
import com.splitwise.server.service.TransactionService;
import com.splitwise.server.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/friends")
public class FriendshipController {

    private final FriendshipService friendshipService;
    private final TransactionService transactionService;

    public FriendshipController(FriendshipService friendshipService, UserService userService, TransactionService transactionService) {
        this.friendshipService = friendshipService;
        this.transactionService = transactionService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addFriend(@RequestBody Map<String, Long> payload, HttpSession session) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long friendId = payload.get("friendId");

        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
        }

        try {
            friendshipService.addFriend(user.getId(), friendId);
            return ResponseEntity.ok(Map.of("message", "Friend added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping()
    public ResponseEntity<?> getFriends(HttpSession session) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
        }

        try {
            return ResponseEntity.ok(friendshipService.getAllFriends(user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error retrieving friends"));
        }
    }

    @PostMapping("/{friendId}/expenses")
    public ResponseEntity<?> addFriendExpense(
            @PathVariable Long friendId,
            @RequestBody FriendExpenseRequest request,
            HttpSession session) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
        }

        try {
            transactionService.addFriendExpense(user.getId(), friendId, request);
            return ResponseEntity.ok(Map.of("message", "Friend expense added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }


    @GetMapping("/{friendId}/expenses")
    public ResponseEntity<?> getFriendExpenses(@PathVariable Long friendId, HttpSession session) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
        }

        try {
            List<FriendExpenseResponse> expenses = transactionService.getFriendExpenses(user.getId(), friendId);
            return ResponseEntity.ok(expenses);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error retrieving expenses"));
        }
    }

    @DeleteMapping("/{friendId}")
    public ResponseEntity<?> removeFriend(@PathVariable Long friendId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
        }

        try {
            friendshipService.removeFriend(user.getId(), friendId);
            return ResponseEntity.ok(Map.of("message", "Friend removed successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
