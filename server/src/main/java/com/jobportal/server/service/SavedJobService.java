// server/src/main/java/com/jobportal/server/service/SavedJobService.java
package com.jobportal.server.service;

import com.jobportal.server.entity.SavedJob;
import com.jobportal.server.entity.JobSeekerProfile;
import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.repository.JobPostRepository;
import com.jobportal.server.repository.JobSeekerProfileRepository;
import com.jobportal.server.repository.SavedJobRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;
    private final JobPostRepository jobPostRepository;
    private final JobSeekerProfileRepository jobSeekerProfileRepository;

    public SavedJobService(
            SavedJobRepository savedJobRepository,
            JobPostRepository jobPostRepository,
            JobSeekerProfileRepository jobSeekerProfileRepository
    ) {
        this.savedJobRepository = savedJobRepository;
        this.jobPostRepository = jobPostRepository;
        this.jobSeekerProfileRepository = jobSeekerProfileRepository;
    }

    private JobSeekerProfile getJobSeekerByEmail(String email) {
    return jobSeekerProfileRepository
            .findByUser_Email(email)
            .orElseThrow(() -> new IllegalArgumentException("Job seeker not found for email " + email));
}

    @Transactional
    public void saveJob(Long jobId, String email) {
        JobPost job = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found: " + jobId));
        JobSeekerProfile seeker = getJobSeekerByEmail(email);

        if (savedJobRepository.existsByJobAndJobSeeker(job, seeker)) {
            return; // already saved, do nothing
        }

        SavedJob savedJob = new SavedJob();
        savedJob.setJob(job);
        savedJob.setJobSeeker(seeker);

        savedJobRepository.save(savedJob);
    }

    @Transactional
    public void removeSavedJob(Long jobId, String email) {
        JobPost job = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found: " + jobId));
        JobSeekerProfile seeker = getJobSeekerByEmail(email);

        savedJobRepository.findByJobAndJobSeeker(job, seeker)
                .ifPresent(savedJobRepository::delete);
    }

    @Transactional(readOnly = true)
    public List<SavedJob> getSavedJobs(String email) {
        JobSeekerProfile seeker = getJobSeekerByEmail(email);
        return savedJobRepository.findByJobSeeker(seeker);
    }
}
