package com.jobportal.server.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.jobportal.server.entity.profile.JobPost;
import com.jobportal.server.entity.JobSeekerProfile;
import jakarta.persistence.*;

@Entity
@Table(
    name = "job_applications",
    uniqueConstraints = @UniqueConstraint(columnNames = {"job_id", "jobseeker_id"})
)
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "employer", "applications"})
    private JobPost job;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "jobseeker_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "applications"})
    private JobSeekerProfile jobSeeker;

    @Column(nullable = false)
    private LocalDateTime appliedAt = LocalDateTime.now();

    private String resumeUrl;
    private String resumeFileName;

    @Column(nullable = false)
    private String status = "APPLIED";  

    public JobApplication() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public JobPost getJob() { return job; }
    public void setJob(JobPost job) { this.job = job; }

    public JobSeekerProfile getJobSeeker() { return jobSeeker; }
    public void setJobSeeker(JobSeekerProfile jobSeeker) { this.jobSeeker = jobSeeker; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getResumeFileName() { return resumeFileName; }
    public void setResumeFileName(String resumeFileName) { this.resumeFileName = resumeFileName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
