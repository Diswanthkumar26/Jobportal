// server/src/main/java/com/jobportal/server/entity/profile/Project.java
package com.jobportal.server.entity.profile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jobportal.server.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Project name is required")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Project period is required")
    @Size(max = 50)
    private String period;

    @Size(max = 2000)
    @Column(columnDefinition = "TEXT")
    private String description;

    @Size(max = 2048)
    private String link;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    @JsonIgnore
    private User user;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
