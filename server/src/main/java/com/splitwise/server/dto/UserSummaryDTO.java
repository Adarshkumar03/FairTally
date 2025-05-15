package com.splitwise.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSummaryDTO {
    private BigDecimal totalOwes;
    private BigDecimal totalOwedTo;
    private BigDecimal netBalance;
    private List<TransactionDTO> recentTransactions;
}
