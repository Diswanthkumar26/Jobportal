package com.jobportal.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jobportal.server.entity.JobApplication;
import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.repository.JobApplicationRepository;
import com.jobportal.server.repository.JobRepository;

@Service
public class ApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public ApplicationService(JobApplicationRepository applicationRepository,
                              JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }

    public List<JobApplication> getApplicantsForJob(Long jobId, String employerEmail) {
        JobPost job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (job.getEmployer() == null ||
            job.getEmployer().getUser() == null ||
            !job.getEmployer().getUser().getEmail().equals(employerEmail)) {
            throw new RuntimeException("Not allowed to view applicants");
        }

        List<JobApplication> apps = applicationRepository.findByJob_Id(jobId);
        System.out.println("jobId=" + jobId + " employer=" + employerEmail
                + " applicants=" + apps.size());
        return apps;
    }
}
