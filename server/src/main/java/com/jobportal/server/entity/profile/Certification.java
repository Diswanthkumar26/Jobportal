// server/src/main/java/com/jobportal/server/entity/profile/Certification.java
package com.jobportal.server.entity.profile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jobportal.server.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "certifications")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Certification name is required")
    @Size(max = 150)
    private String name;

    @NotBlank(message = "Issuer is required")
    @Size(max = 150)
    private String issuer;

    @NotBlank(message = "Year is required")
    @Size(max = 20)
    private String year;

    @Size(max = 50)
    private String validity;

    @Size(max = 2000)
    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    @JsonIgnore
    private User user;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getValidity() { return validity; }
    public void setValidity(String validity) { this.validity = validity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
