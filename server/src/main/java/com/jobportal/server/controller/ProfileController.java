// server/src/main/java/com/jobportal/server/controller/ProfileController.java
package com.jobportal.server.controller;

import com.jobportal.server.dto.UpdateJobSeekerRequest;
import com.jobportal.server.entity.User;
import com.jobportal.server.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile/job-seeker")
@RequiredArgsConstructor
public class ProfileController {

    private final UserProfileService profileService;

    @GetMapping
    public User getProfile(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        return profileService.findByEmail(email);
    }

    @PutMapping
    public User update(@RequestBody UpdateJobSeekerRequest req,
                       Authentication authentication) {

        String email = (String) authentication.getPrincipal();
        User u = profileService.findByEmail(email);
        return profileService.updateJobSeekerProfile(u.getId(), req);
    }
}
