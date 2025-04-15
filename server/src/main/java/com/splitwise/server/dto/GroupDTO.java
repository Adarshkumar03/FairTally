package com.splitwise.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupDTO {
    private Long id;
    private String name;
    private List<UserDTO> users;

    public GroupDTO(Long id, String name, List<UserDTO> users) {
        this.id = id;        this.name = name;
        this.users = users;
    }
}

