package com.splitwise.server.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class TransactionDTO {
    private Long id;
    private Long payerId;
    private String payerName;
    private Long payeeId;
    private String payeeName;
    private BigDecimal amount;
    private LocalDateTime date;
    private Long groupId;
    private String groupName;
    private boolean settled;
    private String description;
    private String type; // "GROUP" or "FRIEND"

    public TransactionDTO(Long id, Long payerId, String payerName, Long payeeId, String payeeName,
                          BigDecimal amount, LocalDateTime date, Long groupId, String groupName,
                          boolean settled, String description) {
        this.id = id;
        this.payerId = payerId;
        this.payerName = payerName;
        this.payeeId = payeeId;
        this.payeeName = payeeName;
        this.amount = amount;
        this.date = date;
        this.groupId = groupId;
        this.groupName = groupName;
        this.settled = settled;
        this.description = description;
        this.type = (groupId != null) ? "GROUP" : "FRIEND";
    }
}
