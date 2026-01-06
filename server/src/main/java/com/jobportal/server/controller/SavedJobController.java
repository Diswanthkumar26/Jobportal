// server/src/main/java/com/jobportal/server/controller/SavedJobController.java
package com.jobportal.server.controller;

import com.jobportal.server.entity.SavedJob;
import com.jobportal.server.service.SavedJobService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

    private final SavedJobService savedJobService;

    public SavedJobController(SavedJobService savedJobService) {
        this.savedJobService = savedJobService;
    }

    @PostMapping("/{jobId}")
    public void saveJob(@PathVariable Long jobId, Authentication authentication) {
        String email = authentication.getName();
        savedJobService.saveJob(jobId, email);
    }

    @DeleteMapping("/{jobId}")
    public void removeSavedJob(@PathVariable Long jobId, Authentication authentication) {
        String email = authentication.getName();
        savedJobService.removeSavedJob(jobId, email);
    }

    @GetMapping("/me")
    public List<SavedJob> mySavedJobs(Authentication authentication) {
        String email = authentication.getName();
        return savedJobService.getSavedJobs(email);
    }
}
