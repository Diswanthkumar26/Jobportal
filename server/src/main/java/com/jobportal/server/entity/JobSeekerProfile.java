// server/src/main/java/com/jobportal/server/entity/JobSeekerProfile.java
package com.jobportal.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "job_seeker_profiles")
public class JobSeekerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String firstName;
    private String lastName;
    private String gender;
    private String dob;
    private String currentCity;
    private String preferredLocations;
    private String totalExperience;
    private String currentRole;
    private String highestEducation;
    private String keySkills;
    private String currentSalary;
    private String expectedSalary;
    private String workType;

    @Column(length = 2000)
    private String about;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "resume_file_name")
    private String resumeFileName;

    private String linkedin;
    private String phone;
    private String noticePeriod;

    @Column(length = 2000)
    private String skills;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String experiencesJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String projectsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String educationJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String certificationsJson;

    // getters/setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getCurrentCity() { return currentCity; }
    public void setCurrentCity(String currentCity) { this.currentCity = currentCity; }

    public String getPreferredLocations() { return preferredLocations; }
    public void setPreferredLocations(String preferredLocations) {
        this.preferredLocations = preferredLocations;
    }

    public String getTotalExperience() { return totalExperience; }
    public void setTotalExperience(String totalExperience) {
        this.totalExperience = totalExperience;
    }

    public String getCurrentRole() { return currentRole; }
    public void setCurrentRole(String currentRole) { this.currentRole = currentRole; }

    public String getHighestEducation() { return highestEducation; }
    public void setHighestEducation(String highestEducation) {
        this.highestEducation = highestEducation;
    }

    public String getKeySkills() { return keySkills; }
    public void setKeySkills(String keySkills) { this.keySkills = keySkills; }

    public String getCurrentSalary() { return currentSalary; }
    public void setCurrentSalary(String currentSalary){
        this.currentSalary = currentSalary;
    }

    public String getExpectedSalary() { return expectedSalary; }
    public void setExpectedSalary(String expectedSalary) {
        this.expectedSalary = expectedSalary;
    }

    public String getWorkType() { return workType; }
    public void setWorkType(String workType) { this.workType = workType; }

    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getResumeFileName() { return resumeFileName; }
    public void setResumeFileName(String resumeFileName) { this.resumeFileName = resumeFileName; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getNoticePeriod() { return noticePeriod; }
    public void setNoticePeriod(String noticePeriod) { this.noticePeriod = noticePeriod; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getExperiencesJson() { return experiencesJson; }
    public void setExperiencesJson(String experiencesJson) { this.experiencesJson = experiencesJson; }

    public String getProjectsJson() { return projectsJson; }
    public void setProjectsJson(String projectsJson) { this.projectsJson = projectsJson; }

    public String getEducationJson() { return educationJson; }
    public void setEducationJson(String educationJson) { this.educationJson = educationJson; }

    public String getCertificationsJson() { return certificationsJson; }
    public void setCertificationsJson(String certificationsJson) { this.certificationsJson = certificationsJson; }
}
