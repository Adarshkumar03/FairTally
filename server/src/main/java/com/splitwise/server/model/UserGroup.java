package com.splitwise.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_group")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-usergroup")
    private User user;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    @JsonBackReference("group-usergroup")
    private Group group;

    @Override
    public String toString() {
        return "UserGroup{id=" + id + ", userId=" + (user != null ? user.getId() : "null") +
                ", groupId=" + (group != null ? group.getId() : "null") + "}";
    }
}
