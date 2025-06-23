package com.splitwise.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FriendExpenseRequest {
    private BigDecimal amount;
    private String description;
}