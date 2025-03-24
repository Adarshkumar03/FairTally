package com.splitwise.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OweDetailsDTO {
    private Long payerId;
    private String payerName;
    private BigDecimal totalOwed;

    public OweDetailsDTO(Long payerId, String payerName, BigDecimal totalOwed) {
        this.payerId = payerId;
        this.payerName = payerName;
        this.totalOwed = totalOwed;
    }
}
