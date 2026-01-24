package com.jobportal.server.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.server.entity.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    boolean existsByJob_IdAndJobSeeker_Id(Long jobId, Long jobSeekerId);

    List<JobApplication> findByJobSeeker_Id(Long jobSeekerId);

    List<JobApplication> findByJob_Employer_Id(Long employerId);

    List<JobApplication> findByJob_Id(Long jobId);

    List<JobApplication> findByJobId(Long jobId);
    
    long countByAppliedAt(LocalDate appliedAt);

    long countByAppliedAtBetween(LocalDateTime start, LocalDateTime end);

    List<JobApplication> findTop5ByOrderByAppliedAtDesc();

}
