package com.jobportal.server.dto;

public class JobSummaryDto {

    private Long id;
    private String title;
    private String employerName;
    private String status;

    public JobSummaryDto() {
    }

    public JobSummaryDto(Long id,
                         String title,
                         String employerName,
                         String status) {
        this.id = id;
        this.title = title;
        this.employerName = employerName;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEmployerName() {
        return employerName;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
