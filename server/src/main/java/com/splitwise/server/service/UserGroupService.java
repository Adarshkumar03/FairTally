package com.splitwise.server.service;

import com.splitwise.server.model.Group;
import com.splitwise.server.model.User;
import com.splitwise.server.model.UserGroup;
import com.splitwise.server.repo.UserGroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserGroupService {

    private final UserGroupRepo userGroupRepo;

    @Autowired
    public UserGroupService(UserGroupRepo userGroupRepo) {
        this.userGroupRepo = userGroupRepo;
    }

    public UserGroup addUserToGroup(User user, Group group) {
        UserGroup userGroup = new UserGroup();
        userGroup.setUser(user);
        userGroup.setGroup(group);
        return userGroupRepo.save(userGroup);
    }
}

