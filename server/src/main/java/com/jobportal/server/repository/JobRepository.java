package com.jobportal.server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.server.entity.profile.JobPost;

public interface JobRepository extends JpaRepository<JobPost, Long> {

    List<JobPost> findByEmployerId(Long employerId);

    List<JobPost> findByStatus(String status);

    Optional<JobPost> findById(Long id);

    long countByStatus(String status);

    List<JobPost> findTop5ByStatusOrderByCreatedAtDesc(String status);
}
