package com.splitwise.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ExpenseRequestDTO {
    private BigDecimal amount;
    private Long groupId;
    private Long payerId;
    private Set<Long> sharedWithUserIds;

    public ExpenseRequestDTO(BigDecimal amount, Long groupId, Long payerId, Set<Long> sharedWithUserIds) {
        this.amount = amount;
        this.groupId = groupId;
        this.payerId = payerId;
        this.sharedWithUserIds = sharedWithUserIds;
    }
}
