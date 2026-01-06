// server/src/main/java/com/jobportal/server/repository/SavedJobRepository.java
package com.jobportal.server.repository;

import com.jobportal.server.entity.SavedJob;
import com.jobportal.server.entity.JobSeekerProfile;
import com.jobportal.server.entity.profile.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {

    List<SavedJob> findByJobSeeker(JobSeekerProfile jobSeeker);

    boolean existsByJobAndJobSeeker(JobPost job, JobSeekerProfile jobSeeker);

    Optional<SavedJob> findByJobAndJobSeeker(JobPost job, JobSeekerProfile jobSeeker);
}
