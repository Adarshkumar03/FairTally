package com.splitwise.server.service;

import com.splitwise.server.dto.ExpenseRequestDTO;
import com.splitwise.server.dto.ExpenseResponseDTO;
import com.splitwise.server.model.Expense;
import com.splitwise.server.model.Group;
import com.splitwise.server.model.Transaction;
import com.splitwise.server.model.User;
import com.splitwise.server.repo.ExpenseRepo;
import com.splitwise.server.repo.GroupRepo;
import com.splitwise.server.repo.TransactionRepo;
import com.splitwise.server.repo.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ExpenseService {
    private final ExpenseRepo expenseRepo;
    private final GroupRepo groupRepo;
    private final UserRepo userRepo;
    private final TransactionRepo transactionRepo;

    public ExpenseService(ExpenseRepo expenseRepo, GroupRepo groupRepo, UserRepo userRepo, TransactionRepo transactionRepo) {
        this.expenseRepo = expenseRepo;
        this.groupRepo = groupRepo;
        this.userRepo = userRepo;
        this.transactionRepo = transactionRepo;
    }

    public List<ExpenseResponseDTO> getAllExpenses() {
        return expenseRepo.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ExpenseResponseDTO> getExpensesForGroup(Long groupId) {
        Group group = groupRepo.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        List<Expense> expenses = expenseRepo.findByGroup(group);

        return expenses.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ExpenseResponseDTO addExpense(ExpenseRequestDTO expenseRequestDTO) {
        // Fetch the group
        Group group = groupRepo.findById(expenseRequestDTO.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        // Fetch the payer
        User payer = userRepo.findById(expenseRequestDTO.getPayerId())
                .orElseThrow(() -> new RuntimeException("Payer not found"));

        // Fetch users sharing the expense
        Set<User> sharedWithUsers = new HashSet<>();
        for (Long userId : expenseRequestDTO.getSharedWithUserIds()) {
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            sharedWithUsers.add(user);
        }

        sharedWithUsers.remove(payer);

        if (sharedWithUsers.isEmpty()) {
            throw new RuntimeException("Cannot split expense among 0 users");
        }

        // Calculate equal split amount
        BigDecimal splitAmount = expenseRequestDTO.getAmount()
                .divide(BigDecimal.valueOf(sharedWithUsers.size()+1), 2, RoundingMode.HALF_UP);

        System.out.println("SplitAMount: " + splitAmount);

        // Create and save the expense
        Expense expense = new Expense();
        expense.setAmount(expenseRequestDTO.getAmount());
        expense.setDate(LocalDateTime.now());
        expense.setGroup(group);
        expense.setPayer(payer);
        expense.setSharedWith(sharedWithUsers);
        expenseRepo.save(expense);

        // Create transactions (who owes whom)
        for (User user : sharedWithUsers) {
            if (!user.equals(payer)) {
                Transaction transaction = new Transaction();
                transaction.setPayer(payer);
                transaction.setPayee(user);
                transaction.setAmount(splitAmount);
                transaction.setDate(LocalDateTime.now());
                transaction.setGroup(group);
                transactionRepo.save(transaction);
            }
        }

        return mapToResponseDTO(expense);
    }

    private ExpenseResponseDTO mapToResponseDTO(Expense expense) {
        return new ExpenseResponseDTO(
                expense.getId(),
                expense.getAmount(),
                expense.getDate(),
                expense.getGroup().getId(),
                expense.getPayer().getId(),
                expense.getSharedWith().stream().map(User::getId).collect(Collectors.toSet())
        );
    }
}
