package com.jobportal.server.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobportal.server.entity.JobApplication;
import com.jobportal.server.service.JobApplicationService;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    private final JobApplicationService applicationService;

    public JobApplicationController(JobApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/{jobId}")
    public JobApplication apply(@PathVariable Long jobId,
                                Authentication authentication) {
        String email = authentication.getName();
        return applicationService.apply(jobId, email);
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
