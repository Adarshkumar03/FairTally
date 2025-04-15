package com.splitwise.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BasicUserDTO {
    private Long id;
    private String name;

    public BasicUserDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
