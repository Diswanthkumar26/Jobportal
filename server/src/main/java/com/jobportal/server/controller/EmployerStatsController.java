// src/main/java/com/jobportal/server/controller/EmployerStatsController.java
package com.jobportal.server.controller;

import com.jobportal.server.dto.EmployerStatsDto;
import com.jobportal.server.service.EmployerStatsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employer")
public class EmployerStatsController {

    private final EmployerStatsService statsService;

    public EmployerStatsController(EmployerStatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/stats")
    public EmployerStatsDto getStats() {
        
        Long hardcodedEmployerId = 1L;
        return statsService.getStatsForEmployer(hardcodedEmployerId);
    }
}
