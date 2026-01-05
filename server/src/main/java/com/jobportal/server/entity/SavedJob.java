package com.jobportal.server.entity;

import java.time.LocalDateTime;

import com.jobportal.server.entity.profile.JobPost;
import jakarta.persistence.*;

@Entity
@Table(
    name = "saved_jobs",
    uniqueConstraints = @UniqueConstraint(columnNames = {"job_id", "jobseeker_id"})
)
public class SavedJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private JobPost job;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "jobseeker_id")
    private JobSeekerProfile jobSeeker;

    @Column(nullable = false)
    private LocalDateTime savedAt = LocalDateTime.now();

    public SavedJob() {
    }

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public JobPost getJob() {
        return job;
    }

    public void setJob(JobPost job) {
        this.job = job;
    }

    public JobSeekerProfile getJobSeeker() {
        return jobSeeker;
    }

    public void setJobSeeker(JobSeekerProfile jobSeeker) {
        this.jobSeeker = jobSeeker;
    }

    public LocalDateTime getSavedAt() {
        return savedAt;
    }

    public void setSavedAt(LocalDateTime savedAt) {
        this.savedAt = savedAt;
    }
}
