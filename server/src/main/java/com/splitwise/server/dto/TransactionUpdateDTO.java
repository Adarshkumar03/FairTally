package com.splitwise.server.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransactionUpdateDTO {
    private BigDecimal amount;

    private String description;

    private Long payerId;

    private Long payeeId;
}
