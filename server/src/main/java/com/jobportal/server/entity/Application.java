package com.jobportal.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "applications",
       uniqueConstraints = @UniqueConstraint(
           name = "uk_app_user_job",
           columnNames = {"user_id", "job_id"}
       ))
@Getter
@Setter
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // store FK ids directly (no Job entity needed yet)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "job_id", nullable = false)
    private Long jobId;

    @Column(nullable = false, length = 30)
    private String status = "PENDING";

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    private Instant updatedAt;
}
