// src/main/java/com/jobportal/server/controller/EmployerJobController.java
package com.jobportal.server.controller;

import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.repository.JobRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employer")
public class EmployerJobController {

    private final JobRepository jobRepository;

    public EmployerJobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping("/{employerId}/jobs")
    public ResponseEntity<List<JobPost>> getJobsByEmployer(
            @PathVariable Long employerId) {

        return ResponseEntity.ok(
                jobRepository.findByEmployerId(employerId)
        );
    }
}

