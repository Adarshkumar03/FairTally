package com.splitwise.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String name;
    private BigDecimal totalOwedAmount;

    public UserDTO(Long id, String name, BigDecimal totalOwedAmount) {
        this.id = id;
        this.name = name;
        this.totalOwedAmount = totalOwedAmount;
    }
}
