package com.splitwise.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "friendships", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "friend_id"}),
        @UniqueConstraint(columnNames = {"friend_id", "user_id"})})
@Getter
@Setter
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "friend_id", nullable = false)
    private User friend;

    @Column(name = "created_at")
    private final LocalDateTime createdAt;

    public Friendship() {
        this.createdAt = LocalDateTime.now();
    }

    public Friendship(User user, User friend) {
        this.user = user;
        this.friend = friend;
        this.createdAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Friendship{" +
                "id=" + id +
                ", user=" + user +
                ", friend=" + friend +
                ", createdAt=" + createdAt +
                '}';
    }
}

