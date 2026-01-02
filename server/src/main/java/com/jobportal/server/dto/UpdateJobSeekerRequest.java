// server/src/main/java/com/jobportal/server/dto/UpdateJobSeekerRequest.java
package com.jobportal.server.dto;

import com.jobportal.server.entity.profile.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class UpdateJobSeekerRequest {

    @Size(max = 2000, message = "About section must be at most 2000 characters")
    private String about;

    private List<@Size(min = 1, max = 50, message = "Skill must be between 1 and 50 characters") String> skills;

    @Size(max = 2048, message = "Resume URL is too long")
    private String resumeUrl;

    @Size(max = 100, message = "Headline must be at most 100 characters")
    private String headline;

    @Size(max = 100, message = "Location must be at most 100 characters")
    private String location;

    @Size(max = 2048, message = "Photo URL is too long")
    private String photoUrl;

    @Valid
    private List<@Valid Experience> experiences;

    @Valid
    private List<@Valid Project> projects;

    @Valid
    private List<@Valid Education> education;

    @Valid
    private List<@Valid Certification> certifications;
}
