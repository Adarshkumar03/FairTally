package com.splitwise.server.controller;

import com.splitwise.server.model.Group;
import com.splitwise.server.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GroupController {
    @Autowired
    private GroupService service;

    @GetMapping("/groups")
    public List<Group> getAllGroups(){
        return service.getAllGroups();
    }

    @GetMapping("/group/{id}")
    public Group getGroup(@PathVariable Long id){
        return service.getProductById(id);
    }
}
