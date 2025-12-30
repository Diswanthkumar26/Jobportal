// server/src/main/java/com/jobportal/server/dto/UpdateJobSeekerRequest.java
package com.jobportal.server.dto;

import com.jobportal.server.entity.User;
import com.jobportal.server.entity.profile.*;
import lombok.Data;

import java.util.List;

@Data
public class UpdateJobSeekerRequest {

    private String about;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Project> projects;
    private List<Education> education;
    private List<Certification> certifications;
    private String resumeUrl;

    private String headline;
    private String location;
    private String photoUrl;

    public static UpdateJobSeekerRequest fromUser(User u) {
        UpdateJobSeekerRequest dto = new UpdateJobSeekerRequest();
        dto.setAbout(u.getAbout());
        dto.setSkills(u.getSkills());
        dto.setResumeUrl(u.getResumeUrl());
        dto.setHeadline(u.getHeadline());
        dto.setLocation(u.getLocation());
        dto.setPhotoUrl(u.getPhotoUrl());

        dto.setExperiences(u.getExperiences());
        dto.setProjects(u.getProjects());
        dto.setEducation(u.getEducation());
        dto.setCertifications(u.getCertifications());
        return dto;
    }
}
