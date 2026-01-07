// server/src/main/java/com/jobportal/server/service/JobApplicationService.java
package com.jobportal.server.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.jobportal.server.entity.JobApplication;
import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.entity.JobSeekerProfile;
import com.jobportal.server.entity.EmployerProfile;
import com.jobportal.server.repository.JobApplicationRepository;
import com.jobportal.server.repository.JobRepository;
import com.jobportal.server.repository.JobSeekerProfileRepository;
import com.jobportal.server.repository.EmployerProfileRepository;

@Service
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final JobSeekerProfileRepository jobSeekerProfileRepository;
    private final EmployerProfileRepository employerProfileRepository;

    public JobApplicationService(JobApplicationRepository applicationRepository,
                                 JobRepository jobRepository,
                                 JobSeekerProfileRepository jobSeekerProfileRepository,
                                 EmployerProfileRepository employerProfileRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.jobSeekerProfileRepository = jobSeekerProfileRepository;
        this.employerProfileRepository = employerProfileRepository;
    }

    // email comes from JWT
    public JobApplication apply(Long jobId, String email) {
        JobSeekerProfile seeker = jobSeekerProfileRepository
                .findByUser_Email(email)   // implement this in repo
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));

        JobPost job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (applicationRepository.existsByJob_IdAndJobSeeker_Id(jobId, seeker.getId())) {
            throw new IllegalStateException("Already applied");
        }

        JobApplication app = new JobApplication();
        app.setJob(job);
        app.setJobSeeker(seeker);
        return applicationRepository.save(app);
    }

    public boolean isApplied(Long jobId, String email) {
        JobSeekerProfile seeker = jobSeekerProfileRepository
                .findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));
        return applicationRepository.existsByJob_IdAndJobSeeker_Id(jobId, seeker.getId());
    }

    public List<JobApplication> myApplications(String email) {
        JobSeekerProfile seeker = jobSeekerProfileRepository
                .findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));
        return applicationRepository.findByJobSeeker_Id(seeker.getId());
    }

    public List<JobApplication> employerApplicants(String email) {
        EmployerProfile employer = employerProfileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Employer profile not found"));
        return applicationRepository.findByJob_Employer_Id(employer.getId());
    }
}
