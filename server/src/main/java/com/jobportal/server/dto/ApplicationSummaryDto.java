// src/main/java/com/jobportal/server/dto/ApplicationSummaryDto.java
package com.jobportal.server.dto;

import java.time.LocalDateTime;

public class ApplicationSummaryDto {
    public Long id;
    public String jobTitle;
    public String seekerEmail;
    public String status;
    public LocalDateTime appliedAt;

    public ApplicationSummaryDto(Long id, String jobTitle,
                                 String seekerEmail, String status,
                                 LocalDateTime appliedAt) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.seekerEmail = seekerEmail;
        this.status = status;
        this.appliedAt = appliedAt;
    }
}
