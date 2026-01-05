package com.jobportal.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employer_profiles")
public class EmployerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String companyName;
    private String companyWebsite;
    private String companySize;
    private String industry;
    private String companyType;
    private String headOfficeCity;
    private String country;

    @Column(length = 2000)
    private String aboutCompany;

    private String benefits;
    private String contactPersonName;
    private String contactPersonRole;
    private String contactEmail;
    private String contactPhone;
    private String hiringForRoles;
    private String hiringLocations;

    /* ================= Getters & Setters ================= */

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyWebsite() { return companyWebsite; }
    public void setCompanyWebsite(String companyWebsite) {
        this.companyWebsite = companyWebsite;
    }

    public String getCompanySize() { return companySize; }
    public void setCompanySize(String companySize) {
        this.companySize = companySize;
    }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getCompanyType() { return companyType; }
    public void setCompanyType(String companyType) {
        this.companyType = companyType;
    }

    public String getHeadOfficeCity() { return headOfficeCity; }
    public void setHeadOfficeCity(String headOfficeCity) {
        this.headOfficeCity = headOfficeCity;
    }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getAboutCompany() { return aboutCompany; }
    public void setAboutCompany(String aboutCompany) {
        this.aboutCompany = aboutCompany;
    }

    public String getBenefits() { return benefits; }
    public void setBenefits(String benefits) { this.benefits = benefits; }

    public String getContactPersonName() { return contactPersonName; }
    public void setContactPersonName(String contactPersonName) {
        this.contactPersonName = contactPersonName;
    }

    public String getContactPersonRole() { return contactPersonRole; }
    public void setContactPersonRole(String contactPersonRole) {
        this.contactPersonRole = contactPersonRole;
    }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getHiringForRoles() { return hiringForRoles; }
    public void setHiringForRoles(String hiringForRoles) {
        this.hiringForRoles = hiringForRoles;
    }

    public String getHiringLocations() { return hiringLocations; }
    public void setHiringLocations(String hiringLocations) {
        this.hiringLocations = hiringLocations;
    }
}
