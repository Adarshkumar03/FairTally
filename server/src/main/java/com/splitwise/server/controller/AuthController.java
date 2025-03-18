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

    private final AuthenticationManager authManager;
    private final UserService userService;

    public AuthController(AuthenticationManager authManager, UserService userService) {
        this.authManager = authManager;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        System.out.println("Received password: " + user.getPassword());
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest, HttpSession session) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing email or password"));
        }

        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            // Store authentication in SecurityContext
            SecurityContextHolder.getContext().setAuthentication(auth);

            // Attach Spring Security context to session
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            return ResponseEntity.ok(Map.of("message", "Login Successful", "user", auth.getName()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", "Bad credentials"));
        }
    }



    @GetMapping("/status")
    public ResponseEntity<?> checkAuthStatus() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()
                && !"anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.ok(Map.of("message", "Authenticated", "user", authentication.getName()));
        }
        return ResponseEntity.ok(Map.of("message", "Not authenticated", "user", null));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // Destroy session
        SecurityContextHolder.clearContext(); // Clear Spring Security authentication

        return ResponseEntity.ok(Map.of("message", "Logged Out Successfully", "user", null));
    }
}
