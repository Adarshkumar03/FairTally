package com.splitwise.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
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
