// src/main/java/com/jobportal/server/controller/JobSeekerProfileController.java
package com.jobportal.server.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobportal.server.dto.UpdateJobSeekerRequest;
import com.jobportal.server.dto.UpdateResumeRequest;
import com.jobportal.server.entity.JobSeekerProfile;
import com.jobportal.server.entity.User;
import com.jobportal.server.repository.JobSeekerProfileRepository;
import com.jobportal.server.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/profile/job-seeker")
@PreAuthorize("hasRole('JOBSEEKER')")
public class JobSeekerProfileController {

    private final JobSeekerProfileRepository jobSeekerRepo;
    private final UserRepository userRepo;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JobSeekerProfileController(JobSeekerProfileRepository jobSeekerRepo,
                                      UserRepository userRepo) {
        this.jobSeekerRepo = jobSeekerRepo;
        this.userRepo = userRepo;
    }

    @PostMapping
    public ResponseEntity<?> saveProfile(@RequestBody JobSeekerProfile profile,
                                         Authentication authentication) {
        User user = userRepo.findByEmail(authentication.getName())
                .orElseThrow();

        JobSeekerProfile existing = jobSeekerRepo
                .findByUser_Email(user.getEmail())
                .orElse(new JobSeekerProfile());

        existing.setUser(user);
        existing.setFirstName(profile.getFirstName());
        existing.setLastName(profile.getLastName());
        existing.setGender(profile.getGender());
        existing.setDob(profile.getDob());
        existing.setCurrentCity(profile.getCurrentCity());
        existing.setPreferredLocations(profile.getPreferredLocations());
        existing.setTotalExperience(profile.getTotalExperience());
        existing.setCurrentRole(profile.getCurrentRole());
        existing.setHighestEducation(profile.getHighestEducation());
        existing.setKeySkills(profile.getKeySkills());
        existing.setCurrentSalary(profile.getCurrentSalary());
        existing.setExpectedSalary(profile.getExpectedSalary());
        existing.setWorkType(profile.getWorkType());
        existing.setAbout(profile.getAbout());
        existing.setResumeUrl(profile.getResumeUrl());
        existing.setResumeFileName(profile.getResumeFileName());
        existing.setPhone(
                profile.getPhone() != null ? profile.getPhone() : user.getPhone()
        );
        existing.setNoticePeriod(profile.getNoticePeriod());
        existing.setSkills(profile.getSkills());
        existing.setExperiencesJson(profile.getExperiencesJson());
        existing.setProjectsJson(profile.getProjectsJson());
        existing.setEducationJson(profile.getEducationJson());
        existing.setCertificationsJson(profile.getCertificationsJson());

        jobSeekerRepo.save(existing);

        user.setProfileCompleted(true);
        userRepo.save(user);

        return ResponseEntity.ok("Profile saved");
    }

    @GetMapping("/me")
    public ResponseEntity<JobSeekerProfile> getMyProfile(Authentication authentication) {
        String email = authentication.getName();
        JobSeekerProfile profile = jobSeekerRepo
                .findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<JobSeekerProfile> updateProfile(
            @Valid @RequestBody UpdateJobSeekerRequest req,
            Authentication authentication) {

        String email = authentication.getName();
        JobSeekerProfile existing = jobSeekerRepo
                .findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));

        if (req.getAbout() != null) {
            existing.setAbout(req.getAbout());
        }

        if (req.getSkills() != null) {
            existing.setSkills(String.join(", ", req.getSkills()));
        }

        if (req.getHeadline() != null) {
            existing.setCurrentRole(req.getHeadline());
        }

        if (req.getLocation() != null) {
            existing.setCurrentCity(req.getLocation());
        }

        if (req.getPhotoUrl() != null) {
    User user = existing.getUser();
    if (req.getPhotoUrl().isEmpty()) {
        user.setPhotoUrl(null); 
    } else {
        user.setPhotoUrl(req.getPhotoUrl()); 
    }
    userRepo.save(user);
}




        if (req.getCurrentSalary() != null) {
            existing.setCurrentSalary(req.getCurrentSalary());
        }

        if (req.getExpectedSalary() != null) {
            existing.setExpectedSalary(req.getExpectedSalary());
        }

        if (req.getExperiences() != null) {
            existing.setExperiencesJson(
                    objectMapper.valueToTree(req.getExperiences()).toString()
            );
        }

        if (req.getProjects() != null) {
            existing.setProjectsJson(
                    objectMapper.valueToTree(req.getProjects()).toString()
            );
        }

        if (req.getEducation() != null) {
            existing.setEducationJson(
                    objectMapper.valueToTree(req.getEducation()).toString()
            );
        }

        if (req.getCertifications() != null) {
            existing.setCertificationsJson(
                    objectMapper.valueToTree(req.getCertifications()).toString()
            );
        }

        JobSeekerProfile saved = jobSeekerRepo.save(existing);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/resume")
    public ResponseEntity<JobSeekerProfile> updateResume(
            @RequestBody UpdateResumeRequest req,
            Authentication authentication) {

        String email = authentication.getName();
        JobSeekerProfile existing = jobSeekerRepo
                .findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));

        if (req.getResumeUrl() != null) {
            existing.setResumeUrl(req.getResumeUrl());
        }

        if (req.getResumeFileName() != null) {
            existing.setResumeFileName(req.getResumeFileName());
        }

        JobSeekerProfile saved = jobSeekerRepo.save(existing);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/resume")
    public ResponseEntity<?> deleteResume(Authentication authentication) {
        String email = authentication.getName();

        JobSeekerProfile existing = jobSeekerRepo
                .findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Jobseeker profile not found"));

        existing.setResumeUrl(null);
        existing.setResumeFileName(null);

        jobSeekerRepo.save(existing);

        return ResponseEntity.ok().build();
    }

    // upload profile photo
    @PostMapping("/me/photo")
    public ResponseEntity<PhotoResponse> uploadPhoto(
            @RequestParam("photo") MultipartFile photo,
            Authentication authentication) throws Exception {

        String email = authentication.getName();
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String filename = user.getId() + "-" + photo.getOriginalFilename();
        Path uploadDir = Paths.get("uploads/users");
        Files.createDirectories(uploadDir);
        Files.copy(photo.getInputStream(), uploadDir.resolve(filename),
                   StandardCopyOption.REPLACE_EXISTING);

        String url = "/uploads/users/" + filename;

        user.setPhotoUrl(url);
        userRepo.save(user);

        return ResponseEntity.ok(new PhotoResponse(url));
    }

    public static class PhotoResponse {
        private String photoUrl;
        public PhotoResponse(String photoUrl) { this.photoUrl = photoUrl; }
        public String getPhotoUrl() { return photoUrl; }
        public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    }
}
