package com.splitwise.server.repo;

import com.splitwise.server.model.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepo extends JpaRepository<Friendship, Long> {
    Optional<Friendship> findByUserIdAndFriendId(Long userId, Long friendId);
    List<Friendship> findByUserId(Long userId);
    List<Friendship> findByFriendId(Long friendId);

    @Query("SELECT f FROM Friendship f WHERE f.user.id = :userId AND f.friend.id = :friendId")
    Optional<Friendship> findByUserIds(Long userId, Long friendId);

}

