package com.jobportal.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.service.JobService;

@RestController
@RequestMapping("/api")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }
    @PostMapping("/jobs")
public JobPost createJobAlias(@RequestBody JobPost jobPost,
                              @AuthenticationPrincipal String email) {
    return jobService.createJob(jobPost, email);
}


    @PostMapping("/employer/jobs")
    public JobPost createJob(@RequestBody JobPost jobPost,
                             @AuthenticationPrincipal String email) {
        return jobService.createJob(jobPost, email);
    }

    @GetMapping("/employer/jobs")
    public List<JobPost> employerJobs(@AuthenticationPrincipal String email) {
        return jobService.getEmployerJobs(email);
    }

    @GetMapping("/jobs")
    public List<JobPost> publicJobs() {
        return jobService.getPublicJobs();
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<JobPost> getJob(@PathVariable Long id) {
        return jobService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
