package com.jobportal.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.server.entity.SavedJob;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {

    boolean existsByJobIdAndJobSeekerId(Long jobId, Long jobSeekerId);

    List<SavedJob> findByJobSeekerId(Long jobSeekerId);

    void deleteByJobIdAndJobSeekerId(Long jobId, Long jobSeekerId);
}
