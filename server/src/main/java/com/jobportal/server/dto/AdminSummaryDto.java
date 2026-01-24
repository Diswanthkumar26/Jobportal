package com.jobportal.server.dto;

public class AdminSummaryDto {

    private long jobSeekers;
    private long employers;
    private long activeJobs;
    private long applicationsToday;

    public AdminSummaryDto(long jobSeekers, long employers,
                           long activeJobs, long applicationsToday) {
        this.jobSeekers = jobSeekers;
        this.employers = employers;
        this.activeJobs = activeJobs;
        this.applicationsToday = applicationsToday;
    }

    public long getJobSeekers() {
        return jobSeekers;
    }

    public void setJobSeekers(long jobSeekers) {
        this.jobSeekers = jobSeekers;
    }

    public long getEmployers() {
        return employers;
    }

    public void setEmployers(long employers) {
        this.employers = employers;
    }

    public long getActiveJobs() {
        return activeJobs;
    }

    public void setActiveJobs(long activeJobs) {
        this.activeJobs = activeJobs;
    }

    public long getApplicationsToday() {
        return applicationsToday;
    }

    public void setApplicationsToday(long applicationsToday) {
        this.applicationsToday = applicationsToday;
    }
}
