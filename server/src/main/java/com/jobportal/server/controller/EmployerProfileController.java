package com.jobportal.server.controller;

import com.jobportal.server.entity.EmployerProfile;
import com.jobportal.server.entity.User;
import com.jobportal.server.repository.EmployerProfileRepository;
import com.jobportal.server.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile/employer")
@PreAuthorize("hasRole('EMPLOYER')")
public class EmployerProfileController {

    private final EmployerProfileRepository repo;
    private final UserRepository userRepo;

    public EmployerProfileController(
            EmployerProfileRepository repo,
            UserRepository userRepo
    ) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    @PostMapping
    public ResponseEntity<?> saveProfile(
            @RequestBody EmployerProfile profile,
            Authentication auth
    ) {
        User user = userRepo.findByEmail(auth.getName())
                .orElseThrow();

        profile.setUser(user);
        repo.save(profile);

        user.setProfileCompleted(true);
        userRepo.save(user);

        return ResponseEntity.ok("Profile saved");
    }
}
