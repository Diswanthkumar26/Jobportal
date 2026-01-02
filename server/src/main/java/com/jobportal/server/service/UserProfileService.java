package com.jobportal.server.service;

import com.jobportal.server.dto.UpdateJobSeekerRequest;
import com.jobportal.server.entity.User;
import com.jobportal.server.entity.profile.*;
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
        if (req.getSkills() != null) u.setSkills(req.getSkills());
        if (req.getResumeUrl() != null) u.setResumeUrl(req.getResumeUrl());

        if (req.getHeadline() != null) u.setHeadline(req.getHeadline());
        if (req.getLocation() != null) u.setLocation(req.getLocation());
        if (req.getPhotoUrl() != null) u.setPhotoUrl(req.getPhotoUrl());

        // experiences
        if (req.getExperiences() != null) {
    u.getExperiences().clear();
    for (Experience in : req.getExperiences()) {
        Experience e = new Experience();
        e.setTitle(in.getTitle());
        e.setCompany(in.getCompany());
        e.setLocation(in.getLocation());
        e.setStartDate(in.getStartDate());
        e.setEndDate(in.getEndDate());
        e.setDescription(in.getDescription());
        e.setCurrent(in.isCurrent());   // <— add this
        e.setUser(u);
        u.getExperiences().add(e);
    }
}

        // projects
       if (req.getProjects() != null) {
    u.getProjects().clear();
    for (Project in : req.getProjects()) {
        Project p = new Project();
        p.setName(in.getName());
        p.setPeriod(in.getPeriod());
        p.setLink(in.getLink());
        p.setDescription(in.getDescription());
        p.setUser(u);
        u.getProjects().add(p);
    }
}

        // education
        if (req.getEducation() != null) {
            u.getEducation().clear();
            for (Education in : req.getEducation()) {
                Education ed = new Education();
                ed.setDegree(in.getDegree());
                ed.setSchool(in.getSchool());
                ed.setPeriod(in.getPeriod());
                ed.setLocation(in.getLocation());
                ed.setDescription(in.getDescription());
                ed.setUser(u);
                u.getEducation().add(ed);
            }
        }

        // certifications
        if (req.getCertifications() != null) {
            u.getCertifications().clear();
            for (Certification in : req.getCertifications()) {
                Certification c = new Certification();
                c.setName(in.getName());
                c.setIssuer(in.getIssuer());
                c.setYear(in.getYear());
                c.setValidity(in.getValidity());
                c.setDescription(in.getDescription());
                c.setUser(u);
                u.getCertifications().add(c);
            }
        }

        u.setProfileCompleted(true);
        return userRepository.save(u);
    }
}
