package com.splitwise.server.service;
import com.splitwise.server.model.User;
import com.splitwise.server.repo.UserRepo;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    @Transactional
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    @Transactional
    public User registerUser(User user) throws IllegalArgumentException {
        // Validate name (2-50 characters, only letters and spaces)
        String nameRegex = "^[a-zA-Z\\s]{2,50}$";
        Pattern namePattern = Pattern.compile(nameRegex);
        Matcher nameMatcher = namePattern.matcher(user.getName());
        if (!nameMatcher.matches()) {
            throw new IllegalArgumentException("Name must be 2-50 characters and contain only letters and spaces.");
        }

        // Validate email (standard email format)
        String emailRegex = "^[^\\s@]+@[^\s@]+\\.[^\\s@]+$";
        Pattern emailPattern = Pattern.compile(emailRegex);
        Matcher emailMatcher = emailPattern.matcher(user.getEmail());
        if (!emailMatcher.matches()) {
            throw new IllegalArgumentException("Please enter a valid email address.");
        }

        // Validate password (at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character)
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$";
        Pattern passwordPattern = Pattern.compile(passwordRegex);
        Matcher passwordMatcher = passwordPattern.matcher(user.getPassword());
        if (!passwordMatcher.matches()) {
            throw new IllegalArgumentException(
                    "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
            );
        }

        // If validation passes, encrypt the password and save the user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");

        return userRepo.save(user);
    }

    public List<User> getUsersNotInGroup(Long groupId) {
        return userRepo.findUsersNotInGroup(groupId);
    }
}
