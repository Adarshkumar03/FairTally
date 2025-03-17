package com.splitwise.server.repo;

import com.splitwise.server.model.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroupRepo extends JpaRepository<UserGroup, Long> {

}
