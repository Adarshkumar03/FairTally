package com.splitwise.server.repo;

import com.splitwise.server.model.Group;
import com.splitwise.server.model.User;
import com.splitwise.server.model.UserGroup;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserGroupRepo extends JpaRepository<UserGroup, Long> {
    @Query("SELECT ug FROM UserGroup ug WHERE ug.user = :user AND ug.group = :group")
    Optional<UserGroup> findByUserAndGroup(User user, Group group);

    @Transactional
    @Modifying
    @Query("DELETE FROM UserGroup ug WHERE ug.user = :user AND ug.group = :group")
    void deleteByUserAndGroup(@Param("user") User user, @Param("group") Group group);
}

