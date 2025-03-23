package com.splitwise.server.repo;

import com.splitwise.server.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepo extends JpaRepository<Group, Long> {
    boolean existsByName(String name);
    List<Group> findByUserGroups_User_Id(Long userId);
}
