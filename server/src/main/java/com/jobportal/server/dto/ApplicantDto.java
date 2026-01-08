package com.jobportal.server.dto;

public class ApplicantDto {

    private Long applicationId;
    private Long userId;

    private String name;
    private String email;
    private String phone;

    private String headline;          // current role
    private String location;          // current city
    private String totalExperience;
    private String keySkills;
    private String resumeUrl;

    public ApplicantDto(Long applicationId,
                        Long userId,
                        String name,
                        String email,
                        String phone,
                        String headline,
                        String location,
                        String totalExperience,
                        String keySkills,
                        String resumeUrl) {
        this.applicationId = applicationId;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.headline = headline;
        this.location = location;
        this.totalExperience = totalExperience;
        this.keySkills = keySkills;
        this.resumeUrl = resumeUrl;
    }

    public Long getApplicationId() { return applicationId; }
    public Long getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getHeadline() { return headline; }
    public String getLocation() { return location; }
    public String getTotalExperience() { return totalExperience; }
    public String getKeySkills() { return keySkills; }
    public String getResumeUrl() { return resumeUrl; }
}
