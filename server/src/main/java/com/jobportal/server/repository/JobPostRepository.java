// server/src/main/java/com/jobportal/server/repository/JobPostRepository.java
package com.jobportal.server.repository;

import com.jobportal.server.entity.profile.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostRepository extends JpaRepository<JobPost, Long> {
}
