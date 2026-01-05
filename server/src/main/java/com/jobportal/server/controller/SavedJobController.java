package com.jobportal.server.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.jobportal.server.entity.SavedJob;
import com.jobportal.server.service.SavedJobService;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

    private final SavedJobService savedJobService;

    public SavedJobController(SavedJobService savedJobService) {
        this.savedJobService = savedJobService;
    }

    @PostMapping("/{jobId}")
    public void saveJob(@PathVariable Long jobId,
                        @AuthenticationPrincipal String email) {
        savedJobService.saveJob(jobId, email);
    }

    @DeleteMapping("/{jobId}")
    public void unsaveJob(@PathVariable Long jobId,
                          @AuthenticationPrincipal String email) {
        savedJobService.unsaveJob(jobId, email);
    }

    @GetMapping
    public List<SavedJob> mySavedJobs(@AuthenticationPrincipal String email) {
        return savedJobService.mySavedJobs(email);
    }

    @GetMapping("/{jobId}/saved")
    public boolean isSaved(@PathVariable Long jobId,
                           @AuthenticationPrincipal String email) {
        return savedJobService.isSaved(jobId, email);
    }
}
