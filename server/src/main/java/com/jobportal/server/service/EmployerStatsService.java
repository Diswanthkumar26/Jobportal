// src/main/java/com/jobportal/server/service/EmployerStatsService.java
package com.jobportal.server.service;

import com.jobportal.server.dto.EmployerStatsDto;
import com.jobportal.server.repository.JobApplicationRepository;
import com.jobportal.server.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class EmployerStatsService {

    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;

    public EmployerStatsService(JobRepository jobRepository,
                                JobApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public EmployerStatsDto getStatsForEmployer(Long employerId) {

        long openJobs = 0L;
        long newApplicationsToday = 0L;
        long pendingReviews = 0L;
        long upcomingInterviews = 0L;
        // long openJobs =
        //         jobRepository.countByEmployer_IdAndStatus(employerId, "OPEN");

        // long newApplicationsToday =
        //         applicationRepository.countNewForEmployerSince(
        //                 employerId, LocalDate.now()
        //         );

        // long pendingReviews =
        //         applicationRepository.countPendingForEmployer(employerId);

        // long upcomingInterviews = 0L; // placeholder

        return new EmployerStatsDto(
                openJobs,
                newApplicationsToday,
                pendingReviews,
                upcomingInterviews
        );
    }
}
