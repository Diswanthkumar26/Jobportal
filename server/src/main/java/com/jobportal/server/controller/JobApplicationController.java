package com.jobportal.server.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobportal.server.entity.JobApplication;
import com.jobportal.server.service.JobApplicationService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    private final JobApplicationService applicationService;

    public JobApplicationController(JobApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/{jobId}")
    public ResponseEntity<?> apply(@PathVariable Long jobId,
                                   Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "User not authenticated"));
        }

        String email = authentication.getName();

        try {
            JobApplication app = applicationService.apply(jobId, email);
            return ResponseEntity.ok(app);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/{jobId}/applied")
    public boolean isApplied(@PathVariable Long jobId,
                             Authentication authentication) {
        String email = authentication.getName();
        return applicationService.isApplied(jobId, email);
    }

    @GetMapping("/me")
    public List<JobApplication> myApplications(Authentication authentication) {
        String email = authentication.getName();
        return applicationService.myApplications(email);
    }
}
