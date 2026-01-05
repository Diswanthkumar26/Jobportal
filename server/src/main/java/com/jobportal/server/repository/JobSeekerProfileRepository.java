// server/src/main/java/com/jobportal/server/repository/JobSeekerProfileRepository.java
package com.jobportal.server.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.server.entity.JobSeekerProfile;

public interface JobSeekerProfileRepository extends JpaRepository<JobSeekerProfile, Long> {

    // derived query: profile.user.email = ?
    Optional<JobSeekerProfile> findByUserEmail(String email);
}
