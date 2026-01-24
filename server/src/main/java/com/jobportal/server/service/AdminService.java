// src/main/java/com/jobportal/server/service/AdminService.java
package com.jobportal.server.service;

import com.jobportal.server.dto.AdminSummaryResponse;
import com.jobportal.server.entity.Role;
import com.jobportal.server.entity.JobApplication;
import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.repository.JobApplicationRepository;
import com.jobportal.server.repository.JobRepository;
import com.jobportal.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public AdminService(UserRepository userRepository,
                        JobRepository jobRepository,
                        JobApplicationRepository jobApplicationRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public AdminSummaryResponse getSummary() {
        AdminSummaryResponse dto = new AdminSummaryResponse();

        // --- counts ---
        dto.jobSeekers = userRepository.countByRole(Role.JOBSEEKER);
        dto.employers  = userRepository.countByRole(Role.EMPLOYER);
        dto.activeJobs = jobRepository.countByStatus("OPEN");

        // --- applications today ---
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay   = today.atTime(23, 59, 59, 999_999_999);

        dto.applicationsToday =
                jobApplicationRepository.countByAppliedAtBetween(startOfDay, endOfDay);

        // --- recent jobs ---
        List<JobPost> recentJobEntities =
                jobRepository.findTop5ByStatusOrderByCreatedAtDesc("OPEN");

        dto.recentJobs = recentJobEntities.stream().map(job -> {
            AdminSummaryResponse.RecentJobDto r = new AdminSummaryResponse.RecentJobDto();
            r.id        = job.getId();
            r.title     = job.getTitle();
            r.company   = job.getCompany();
            r.createdAt = job.getCreatedAt();
            return r;
        }).toList();

        // --- recent applications ---
        List<JobApplication> recentApplicationEntities =
                jobApplicationRepository.findTop5ByOrderByAppliedAtDesc();

        dto.recentApplications = recentApplicationEntities.stream().map(app -> {
            AdminSummaryResponse.RecentApplicationDto r =
                    new AdminSummaryResponse.RecentApplicationDto();
            r.id        = app.getId();
            r.status    = app.getStatus();
            r.appliedAt = app.getAppliedAt();

            // JobApplication -> JobPost
            r.jobTitle = app.getJob().getTitle();

            // JobApplication -> JobSeekerProfile -> User -> email
            r.seekerEmail = app.getJobSeeker().getUser().getEmail();

            return r;
        }).toList();

        return dto;
    }
}
