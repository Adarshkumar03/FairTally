package com.splitwise.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseResponseDTO {
    private Long id;
    private BigDecimal amount;
    private String description; // ✅ Added Description Field
    private LocalDateTime date;
    private String payerName;
    private Set<String> sharedWithNames;
}

