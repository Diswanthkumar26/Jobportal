// src/main/java/com/jobportal/server/controller/AdminController.java
package com.jobportal.server.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.server.dto.AdminSummaryResponse;
import com.jobportal.server.dto.ApplicationSummaryDto;
import com.jobportal.server.dto.JobSummaryDto;
import com.jobportal.server.dto.UpdateStatusRequest;
import com.jobportal.server.dto.UserSummaryDto;
import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.repository.JobApplicationRepository;
import com.jobportal.server.repository.JobRepository;
import com.jobportal.server.repository.UserRepository;
import com.jobportal.server.service.AdminService;
import com.jobportal.server.service.NotificationService;
import com.jobportal.server.entity.JobApplication;
import com.jobportal.server.entity.User;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final AdminService adminService;
    private final NotificationService notificationService;

    public AdminController(UserRepository userRepository,
                           JobRepository jobRepository,
                           JobApplicationRepository jobApplicationRepository,
                           AdminService adminService,NotificationService notificationService) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.adminService = adminService;
        this.notificationService = notificationService;
    }

    @GetMapping("/summary")
    public AdminSummaryResponse getSummary() {
        return adminService.getSummary();
    }

    @GetMapping("/users")
    public List<UserSummaryDto> getUsers() {
        return userRepository.findAll().stream()
            .map(u -> new UserSummaryDto(
                    u.getId(),
                    u.getName(),
                    u.getEmail(),
                    u.getRole(),
                    u.isEnabled()
            ))
            .toList();
    }

    @PatchMapping("/users/{id}/enable")
    public void enableUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
    }

   @GetMapping("/applications")
public List<ApplicationSummaryDto> getApplications() {
    return jobApplicationRepository.findAll().stream()
        .map(app -> new ApplicationSummaryDto(
                app.getId(),
                app.getJob().getTitle(),
                app.getJobSeeker().getUser().getEmail(),
                app.getStatus(),
                app.getAppliedAt()
        ))
        .toList();
}


    @PatchMapping("/users/{id}/disable")
    public void disableUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(false);
        userRepository.save(user);
    }

    @GetMapping("/jobs")
public List<JobSummaryDto> getJobs(@RequestParam(required = false) String status) {
    List<JobPost> jobs;

    if (status != null && !status.isBlank()) {
        jobs = jobRepository.findByStatus(status);
    } else {
        jobs = jobRepository.findAll();
    }

    return jobs.stream()
            .map(j -> new JobSummaryDto(
                    j.getId(),
                    j.getTitle(),
                    j.getEmployer() != null && j.getEmployer().getUser() != null
                            ? j.getEmployer().getUser().getName()
                            : "Unknown",
                    j.getStatus()
            ))
            .toList();
}


    @PatchMapping("/jobs/{id}/status")
    public void updateJobStatus(@PathVariable Long id,
                                @RequestBody UpdateStatusRequest req) {
        JobPost job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        job.setStatus(req.getStatus());
        jobRepository.save(job);
    }

   @PatchMapping("/applications/{id}/status")
public void updateApplicationStatus(@PathVariable Long id,
                                    @RequestBody UpdateStatusRequest req) {
    JobApplication app = jobApplicationRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Application not found"));

    app.setStatus(req.getStatus());
    jobApplicationRepository.save(app);

    notificationService.sendApplicationStatusEmail(
        app.getJobSeeker().getUser().getEmail(),
        app.getJob().getTitle(),
        app.getStatus()
    );
}

}
