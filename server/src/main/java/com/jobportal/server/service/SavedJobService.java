// server/src/main/java/com/jobportal/server/service/SavedJobService.java
package com.jobportal.server.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.jobportal.server.entity.SavedJob;
import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.entity.JobSeekerProfile;
import com.jobportal.server.repository.JobRepository;
import com.jobportal.server.repository.JobSeekerProfileRepository;
import com.jobportal.server.repository.SavedJobRepository;

@Service
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;
    private final JobRepository jobRepository;
    private final JobSeekerProfileRepository jobSeekerProfileRepository;

    public SavedJobService(SavedJobRepository savedJobRepository,
                           JobRepository jobRepository,
                           JobSeekerProfileRepository jobSeekerProfileRepository) {
        this.savedJobRepository = savedJobRepository;
        this.jobRepository = jobRepository;
        this.jobSeekerProfileRepository = jobSeekerProfileRepository;
    }

    // email from JWT
    public void saveJob(Long jobId, String email) {
        JobSeekerProfile seeker = jobSeekerProfileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));

        if (savedJobRepository.existsByJobIdAndJobSeekerId(jobId, seeker.getId())) {
            return;
        }

        JobPost job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        SavedJob saved = new SavedJob();
        saved.setJob(job);
        saved.setJobSeeker(seeker);
        savedJobRepository.save(saved);
    }

    public void unsaveJob(Long jobId, String email) {
        JobSeekerProfile seeker = jobSeekerProfileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));
        savedJobRepository.deleteByJobIdAndJobSeekerId(jobId, seeker.getId());
    }

    public List<SavedJob> mySavedJobs(String email) {
        JobSeekerProfile seeker = jobSeekerProfileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));
        return savedJobRepository.findByJobSeekerId(seeker.getId());
    }

    public boolean isSaved(Long jobId, String email) {
        JobSeekerProfile seeker = jobSeekerProfileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));
        return savedJobRepository.existsByJobIdAndJobSeekerId(jobId, seeker.getId());
    }
}
