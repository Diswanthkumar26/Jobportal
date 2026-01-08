// server/src/main/java/com/jobportal/server/repository/JobSeekerProfileRepository.java
package com.jobportal.server.repository;

import com.jobportal.server.entity.JobSeekerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobSeekerProfileRepository extends JpaRepository<JobSeekerProfile, Long> {

    Optional<JobSeekerProfile> findByUser_Email(String email);

    // Optional<JobSeekerProfile> findByUser_Id(Long userId);
}
