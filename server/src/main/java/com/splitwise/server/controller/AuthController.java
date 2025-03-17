package com.splitwise.server.controller;

import com.splitwise.server.dto.LoginRequest;
import com.splitwise.server.model.User;
import com.splitwise.server.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User newUser = userService.registerUser(user.getEmail(), user.getName(), user.getPassword());
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest, HttpSession session) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("{\"message\": \"Missing email or password\"}");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            session.setAttribute("user", authentication.getName());

            return ResponseEntity.ok("{\"message\": \"Login Successful\", \"user\": \"" + authentication.getName() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("{\"message\": \"Bad credentials\"}");
        }
    }


    @GetMapping("/status")
    public ResponseEntity<?> checkAuthStatus(HttpSession session) {
        String user = (String) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok("{\"message\": \"Authenticated\", \"user\": \"" + user + "\"}");
        }
        return ResponseEntity.ok("{\"message\": \"Not authenticated\", \"user\": null}");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // Destroy session
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("{\"message\": \"Logged Out Successfully\", \"user\": null}");
    }
}
