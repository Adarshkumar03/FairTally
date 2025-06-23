package com.splitwise.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FriendExpenseResponse {
    private Long id;
    private Long payerId;
    private Long payeeId;
    private String payerName;
    private String payeeName;
    private BigDecimal amount;
    private String description;
    private LocalDateTime date;
    private boolean settled;
}
