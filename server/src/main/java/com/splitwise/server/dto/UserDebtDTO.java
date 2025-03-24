package com.splitwise.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDebtDTO {
    private Long userId;
    private String userName;
    private BigDecimal totalOwed;
}
