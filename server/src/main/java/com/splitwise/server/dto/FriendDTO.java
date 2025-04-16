package com.splitwise.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendDTO {
    private Long id;
    private String name;
    private String email;

    public FriendDTO(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

}
