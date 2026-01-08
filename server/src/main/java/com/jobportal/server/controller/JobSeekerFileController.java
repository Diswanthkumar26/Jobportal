// server/src/main/java/com/jobportal/server/controller/JobSeekerFileController.java
package com.jobportal.server.controller;

import com.jobportal.server.entity.JobSeekerProfile;
import com.jobportal.server.entity.User;
import com.jobportal.server.repository.JobSeekerProfileRepository;
import com.jobportal.server.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/jobseeker")
public class JobSeekerFileController {

    private final UserRepository userRepo;
    private final JobSeekerProfileRepository profileRepo;

    public JobSeekerFileController(UserRepository userRepo,
                                   JobSeekerProfileRepository profileRepo) {
        this.userRepo = userRepo;
        this.profileRepo = profileRepo;
    }

    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file,
                                          Authentication auth) throws Exception {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Empty file");
        }

        String contentType = file.getContentType();
        if (contentType == null ||
                !(contentType.equals("application/pdf")
                        || contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
                        || contentType.equals("application/msword"))) {
            return ResponseEntity.badRequest().body("Only PDF/DOC/DOCX allowed");
        }

        User user = userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobSeekerProfile profile = profileRepo
                .findByUser_Email(user.getEmail())
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // 1) Delete old resume file if it exists
        String oldUrl = profile.getResumeUrl();
        if (oldUrl != null && !oldUrl.isBlank()) {
            // oldUrl like "/uploads/resumes/filename.pdf" → convert to relative path
            Path oldPath = Path.of(".").resolve(
                    oldUrl.startsWith("/") ? oldUrl.substring(1) : oldUrl
            );
            Files.deleteIfExists(oldPath); // silently ignores if file is missing[web:2175]
        }

        // 2) Ensure upload directory exists
        String uploadsDir = "uploads/resumes";
        Files.createDirectories(Path.of(uploadsDir));

        // 3) Build new filename
        String originalName = file.getOriginalFilename();
        String ext = ".pdf";
        if (originalName != null && originalName.lastIndexOf('.') != -1) {
            ext = originalName.substring(originalName.lastIndexOf('.'));
        }

        String filename = "resume_" + user.getId() + "_" + Instant.now().toEpochMilli() + ext;
        Path target = Path.of(uploadsDir).resolve(filename);

        // 4) Save new file
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        // 5) Update profile with new URL + filename
        String url = "/uploads/resumes/" + filename;
        profile.setResumeUrl(url);
        profile.setResumeFileName(originalName);
        profileRepo.save(profile);

        // 6) Return new info to frontend
        return ResponseEntity.ok(Map.of(
                "url", url,
                "name", originalName
        ));
    }
}
