package com.splitwise.server.service;

import com.splitwise.server.model.Group;
import com.splitwise.server.repo.GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepo repo;

    public List<Group> getAllGroups() {
        return repo.findAll();
    }

    public Group getProductById(Long id) {
        return repo.findById(id).orElse(new Group());
    }
}
