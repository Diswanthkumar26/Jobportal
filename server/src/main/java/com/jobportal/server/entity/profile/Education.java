// server/src/main/java/com/jobportal/server/entity/profile/Education.java
package com.jobportal.server.entity.profile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jobportal.server.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Degree is required")
    @Size(max = 100)
    private String degree;

    @NotBlank(message = "School is required")
    @Size(max = 150)
    private String school;

    @NotBlank(message = "Period is required")
    @Size(max = 50)
    private String period;

    @Size(max = 100)
    private String location;

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

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
