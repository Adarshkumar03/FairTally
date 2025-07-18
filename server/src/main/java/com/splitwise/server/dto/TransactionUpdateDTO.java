package com.splitwise.server.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TransactionUpdateDTO {
    private BigDecimal amount;

    private String description;

    private Long payerId;

    private Long payeeId;
}
