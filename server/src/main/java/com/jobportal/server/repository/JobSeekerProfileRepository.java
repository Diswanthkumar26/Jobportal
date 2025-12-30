package com.jobportal.server.repository;

import com.jobportal.server.entity.JobSeekerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobSeekerProfileRepository
        extends JpaRepository<JobSeekerProfile, Long> {
}
