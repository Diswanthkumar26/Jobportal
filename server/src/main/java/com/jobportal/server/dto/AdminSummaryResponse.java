// src/main/java/com/jobportal/server/dto/AdminSummaryResponse.java
package com.jobportal.server.dto;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

public class AdminSummaryResponse {

    public static class RecentJobDto {
        public Long id;
        public String title;
        public String company;
        public LocalDateTime createdAt;
    }

    public static class RecentApplicationDto {
        public Long id;
        public String jobTitle;
        public String seekerEmail;
        public String status;
        public LocalDateTime appliedAt;
    }

    public long jobSeekers;
    public long employers;
    public long activeJobs;
    public long applicationsToday;

    public List<RecentJobDto> recentJobs;
    public List<RecentApplicationDto> recentApplications;
}
