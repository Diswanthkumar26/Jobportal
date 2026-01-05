// src/main/java/com/jobportal/server/dto/EmployerStatsDto.java
package com.jobportal.server.dto;

public class EmployerStatsDto {

    private long openJobs;
    private long newApplicationsToday;
    private long pendingReviews;
    private long upcomingInterviews;

    public EmployerStatsDto() {
    }

    public EmployerStatsDto(long openJobs,
                            long newApplicationsToday,
                            long pendingReviews,
                            long upcomingInterviews) {
        this.openJobs = openJobs;
        this.newApplicationsToday = newApplicationsToday;
        this.pendingReviews = pendingReviews;
        this.upcomingInterviews = upcomingInterviews;
    }

    public long getOpenJobs() {
        return openJobs;
    }

    public void setOpenJobs(long openJobs) {
        this.openJobs = openJobs;
    }

    public long getNewApplicationsToday() {
        return newApplicationsToday;
    }

    public void setNewApplicationsToday(long newApplicationsToday) {
        this.newApplicationsToday = newApplicationsToday;
    }

    public long getPendingReviews() {
        return pendingReviews;
    }

    public void setPendingReviews(long pendingReviews) {
        this.pendingReviews = pendingReviews;
    }

    public long getUpcomingInterviews() {
        return upcomingInterviews;
    }

    public void setUpcomingInterviews(long upcomingInterviews) {
        this.upcomingInterviews = upcomingInterviews;
    }
}
