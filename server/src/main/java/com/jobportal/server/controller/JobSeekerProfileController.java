package com.jobportal.server.controller;

import com.jobportal.server.entity.JobSeekerProfile;
import com.jobportal.server.entity.User;
import com.jobportal.server.repository.JobSeekerProfileRepository;
import com.jobportal.server.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile/job-seeker")
@PreAuthorize("hasRole('JOBSEEKER')")
public class JobSeekerProfileController {

    private final JobSeekerProfileRepository jobSeekerRepo;
    private final UserRepository userRepo;

    public JobSeekerProfileController(
            JobSeekerProfileRepository jobSeekerRepo,
            UserRepository userRepo
    ) {
        this.jobSeekerRepo = jobSeekerRepo;
        this.userRepo = userRepo;
    }

    @PostMapping
    public ResponseEntity<?> saveProfile(
            @RequestBody JobSeekerProfile profile,
            Authentication authentication
    ) {
        User user = userRepo.findByEmail(authentication.getName())
                .orElseThrow();

        profile.setUser(user);
        jobSeekerRepo.save(profile);

        user.setProfileCompleted(true);
        userRepo.save(user);

        return ResponseEntity.ok("Profile saved");
    }
}
