package com.splitwise.server.service;

import com.splitwise.server.model.Group;
import com.splitwise.server.model.User;
import com.splitwise.server.model.UserGroup;
import com.splitwise.server.repo.GroupRepo;
import com.splitwise.server.repo.UserGroupRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    private final GroupRepo repo;
    private final UserGroupRepo userGroupRepo;

    @Autowired
    public GroupService(GroupRepo groupRepo, UserGroupRepo userGroupRepo) {
        this.repo = groupRepo;
        this.userGroupRepo = userGroupRepo;
    }

    public List<Group> getAllGroups() {
        return repo.findAll();
    }

    public Group getGroupById(Long id) {
        return repo.findById(id).orElse(new Group());
    }

    public boolean existsByName(String name) {
        return repo.existsByName(name);
    }

    @Transactional
    public Group addGroup(Group group, User user) {
        UserGroup userGroup = new UserGroup();
        userGroup.setUser(user);
        userGroup.setGroup(group);

        Group savedGroup = repo.save(group);

        userGroupRepo.save(userGroup);

        return savedGroup;
    }
}
