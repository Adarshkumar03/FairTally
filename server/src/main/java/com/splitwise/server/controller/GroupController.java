package com.splitwise.server.controller;

import com.splitwise.server.model.Group;
import com.splitwise.server.model.User;
import com.splitwise.server.service.GroupService;
import com.splitwise.server.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserService userService;

    @GetMapping("/groups")
    public List<Group> getAllGroups() {
        HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest().getSession();
        System.out.println("Session ID: " + session.getId());
        return groupService.getAllGroups();
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<?> getGroup(@PathVariable Long id) {
        Group group = groupService.getGroupById(id);
        if (group != null) {
            return ResponseEntity.ok(group);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error", "Group not found"));
    }

    @PostMapping("/groups")
    public ResponseEntity<?> addGroup(@RequestBody Group group, Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "User is not authenticated"));
        }

        try {
            // Get the logged-in user
            String email = authentication.getName();
            User user = userService.getUserByEmail(email);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Collections.singletonMap("error", "User not found"));
            }

            // Check if a group with the same name already exists
            if (groupService.existsByName(group.getName())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Collections.singletonMap("error", "Group name already exists"));
            }

            // Save the group
            Group savedGroup = groupService.addGroup(group, user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedGroup);

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Collections.singletonMap("error", "Group name already exists"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Failed to create group"));
        }
    }



}

