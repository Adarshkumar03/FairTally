package com.splitwise.server.repo;

import com.splitwise.server.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupRepo extends JpaRepository<Group, Long> {
    boolean existsByName(String name);
    List<Group> findByUserGroups_User_Id(Long userId);

    @Query("SELECT g FROM Group g WHERE g.id NOT IN (" +
            "SELECT ug.group.id FROM UserGroup ug WHERE ug.user.id = :userId)")
    List<Group> findGroupsUserNotIn(@Param("userId") Long userId);
}
