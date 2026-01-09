package com.jobportal.server.controller;

import com.jobportal.server.dto.ApplicantDto;
import com.jobportal.server.entity.JobApplication;
import com.jobportal.server.entity.JobSeekerProfile;
import com.jobportal.server.entity.User;
import com.jobportal.server.repository.JobApplicationRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employer")
public class EmployerApplicationController {

    private final JobApplicationRepository applicationRepo;

    public EmployerApplicationController(JobApplicationRepository applicationRepo) {
        this.applicationRepo = applicationRepo;
    }

    @PatchMapping("/applications/{applicationId}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long applicationId,
                                             @RequestParam String status) {
        JobApplication app = applicationRepo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        applicationRepo.save(app);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/jobs/{jobId}/applications")
    public List<ApplicantDto> getApplicants(@PathVariable Long jobId) {
        List<JobApplication> apps = applicationRepo.findByJob_Id(jobId);

        return apps.stream().map(app -> {
            JobSeekerProfile p = app.getJobSeeker();
            User u = p.getUser();

            String phone = p.getPhone() != null ? p.getPhone() : u.getPhone();
            String headline = p.getCurrentRole();
            String location = p.getCurrentCity();
            String totalExp = p.getTotalExperience();
            String keySkills = p.getKeySkills();

            String resumeUrl = app.getResumeUrl() != null
                    ? app.getResumeUrl()
                    : p.getResumeUrl();
            String resumeFileName = app.getResumeFileName() != null
                    ? app.getResumeFileName()
                    : p.getResumeFileName();

            return new ApplicantDto(
                    app.getId(),
                    u.getId(),
                    u.getName(),
                    u.getEmail(),
                    phone,
                    headline,
                    location,
                    totalExp,
                    keySkills,
                    resumeUrl,
                    resumeFileName,
                    app.getStatus(),
                    app.getAppliedAt().toString()
            );
        }).toList();
    }
}
