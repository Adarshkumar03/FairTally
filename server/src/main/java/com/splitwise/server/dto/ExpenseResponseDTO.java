package com.splitwise.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class ExpenseResponseDTO {
    private Long id;
    private BigDecimal amount;
    private LocalDateTime date;
    private Long groupId;
    private Long payerId;
    private Set<Long> sharedWithUserIds;
}
