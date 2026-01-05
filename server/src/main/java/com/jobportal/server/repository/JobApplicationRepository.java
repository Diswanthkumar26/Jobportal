package com.jobportal.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.server.entity.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    boolean existsByJobIdAndJobSeekerId(Long jobId, Long jobSeekerId);

    List<JobApplication> findByJobSeekerId(Long jobSeekerId);

    List<JobApplication> findByJobEmployerId(Long employerId);
}
