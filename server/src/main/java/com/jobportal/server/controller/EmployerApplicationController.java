package com.jobportal.server.controller;

import com.jobportal.server.dto.ApplicantDto;
import com.jobportal.server.entity.JobApplication;
import com.jobportal.server.entity.JobSeekerProfile;
import com.jobportal.server.entity.User;
import com.jobportal.server.repository.JobApplicationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employer")
public class EmployerApplicationController {

    private final JobApplicationRepository applicationRepo;

    public EmployerApplicationController(JobApplicationRepository applicationRepo) {
        this.applicationRepo = applicationRepo;
    }

    @GetMapping("/jobs/{jobId}/applications")
    public List<ApplicantDto> getApplicants(@PathVariable Long jobId) {
        List<JobApplication> apps = applicationRepo.findByJobId(jobId);

        return apps.stream().map(app -> {
            JobSeekerProfile p = app.getJobSeeker();
            User u = p.getUser();

            String phone = p.getPhone() != null ? p.getPhone() : u.getPhone();
            String headline = p.getCurrentRole();
            String location = p.getCurrentCity();
            String totalExp = p.getTotalExperience();
            String keySkills = p.getKeySkills();      // adjust field names to your entity
            String resumeUrl = p.getResumeUrl() != null ? p.getResumeUrl() : u.getResumeUrl();

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
                    resumeUrl
            );
        }).toList();
    }
}
