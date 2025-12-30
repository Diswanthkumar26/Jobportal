// server/src/main/java/com/jobportal/server/service/UserProfileService.java
package com.jobportal.server.service;

import com.jobportal.server.dto.UpdateJobSeekerRequest;
import com.jobportal.server.entity.User;
import com.jobportal.server.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;

    public User getProfile(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public User updateJobSeekerProfile(Long id, UpdateJobSeekerRequest req) {
        User u = getProfile(id);

        if (req.getAbout() != null) u.setAbout(req.getAbout());
        if (req.getResumeUrl() != null) u.setResumeUrl(req.getResumeUrl());
        if (req.getSkills() != null) u.setSkills(req.getSkills());
        if (req.getHeadline() != null) u.setHeadline(req.getHeadline());
        if (req.getLocation() != null) u.setLocation(req.getLocation());
        if (req.getPhotoUrl() != null) u.setPhotoUrl(req.getPhotoUrl());

        if (req.getExperiences() != null) {
            u.getExperiences().clear();
            req.getExperiences().forEach(e -> e.setUser(u));
            u.getExperiences().addAll(req.getExperiences());
        }

        if (req.getProjects() != null) {
            u.getProjects().clear();
            req.getProjects().forEach(p -> p.setUser(u));
            u.getProjects().addAll(req.getProjects());
        }

        if (req.getEducation() != null) {
            u.getEducation().clear();
            req.getEducation().forEach(ed -> ed.setUser(u));
            u.getEducation().addAll(req.getEducation());
        }

        if (req.getCertifications() != null) {
            u.getCertifications().clear();
            req.getCertifications().forEach(c -> c.setUser(u));
            u.getCertifications().addAll(req.getCertifications());
        }

        u.setProfileCompleted(true);

        return userRepository.save(u);
    }
}
