// server/src/main/java/com/jobportal/server/service/JobService.java
package com.jobportal.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.entity.EmployerProfile;
import com.jobportal.server.repository.EmployerProfileRepository;
import com.jobportal.server.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final EmployerProfileRepository employerProfileRepository;

    public JobService(JobRepository jobRepository,
                      EmployerProfileRepository employerProfileRepository) {
        this.jobRepository = jobRepository;
        this.employerProfileRepository = employerProfileRepository;
    }

    // email from JWT
    public JobPost createJob(JobPost jobPost, String email) {
        EmployerProfile employer = employerProfileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Employer profile not found"));
        jobPost.setEmployer(employer);
        return jobRepository.save(jobPost);
    }

    public List<JobPost> getEmployerJobs(String email) {
        EmployerProfile employer = employerProfileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Employer profile not found"));
        return jobRepository.findByEmployerId(employer.getId());
    }

    public List<JobPost> getPublicJobs() {
        return jobRepository.findByStatus("OPEN");
    }

    public Optional<JobPost> findById(Long id) {
        return jobRepository.findById(id);
    }

    public Optional<JobPost> updateJob(Long id, JobPost updated, String employerEmail) {
    JobPost existing = jobRepository.findById(id).orElse(null);
    if (existing == null) return Optional.empty();

    // ensure the job belongs to this employer
    if (!existing.getEmployer().getUser().getEmail().equals(employerEmail)) {
        return Optional.empty(); // or throw 403
    }

    existing.setTitle(updated.getTitle());
    existing.setCompany(updated.getCompany());
    existing.setLocation(updated.getLocation());
    existing.setSalaryRange(updated.getSalaryRange());
    existing.setExperience(updated.getExperience());
    existing.setJobType(updated.getJobType());
    existing.setDescription(updated.getDescription());
    // any other fields you want editable

    JobPost saved = jobRepository.save(existing);
    return Optional.of(saved);
}

}
