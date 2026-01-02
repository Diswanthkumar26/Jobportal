package com.jobportal.server.controller;

import com.jobportal.server.dto.LoginResponse;
import com.jobportal.server.entity.Role;
import com.jobportal.server.entity.User;
import com.jobportal.server.repository.UserRepository;
import com.jobportal.server.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PutMapping("/role")
    public ResponseEntity<?> updateRole(
            @RequestParam String role,
            Authentication authentication
    ) {
        User user = userRepo.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role newRole = Role.valueOf(role); // EMPLOYER / JOBSEEKER

        user.setRole(newRole);
        userRepo.save(user);

        String token = JwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return ResponseEntity.ok(
                new LoginResponse(
                        token,
                        user.getRole().name(),
                        user.isProfileCompleted()
                )
        );
    }
}