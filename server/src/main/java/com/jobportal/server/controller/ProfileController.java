package com.jobportal.server.controller;

import com.jobportal.server.dto.UpdateJobSeekerRequest;
import com.jobportal.server.entity.User;
import com.jobportal.server.service.UserProfileService;
import lombok.RequiredArgsConstructor;

// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("/api/profile/job-seeker")
@RequiredArgsConstructor
public class ProfileController {

    private final UserProfileService profileService;

    @GetMapping
    public User getProfile(Authentication authentication) {
        String email = authentication.getName();
        return profileService.findByEmail(email);
    }

    @PutMapping(consumes = "application/json")
public User update(@RequestBody UpdateJobSeekerRequest req,
                   @AuthenticationPrincipal String email) {
    User u = profileService.findByEmail(email);
    return profileService.updateJobSeekerProfile(u.getId(), req);
}


}
