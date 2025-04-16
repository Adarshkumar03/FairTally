package com.splitwise.server.repo;

import com.splitwise.server.model.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepo extends JpaRepository<Friendship, Long> {
    Optional<Friendship> findByUserIdAndFriendId(Long userId, Long friendId);
    List<Friendship> findByUserId(Long userId);
    List<Friendship> findByFriendId(Long friendId);
}

