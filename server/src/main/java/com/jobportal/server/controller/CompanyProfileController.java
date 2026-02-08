// src/main/java/com/jobportal/server/controller/CompanyProfileController.java
package com.jobportal.server.controller;

import org.springframework.web.bind.annotation.*;

import com.jobportal.server.dto.CompanyProfileDto;
import com.jobportal.server.service.CompanyProfileService;

@RestController
@RequestMapping("/api/company")
public class CompanyProfileController {

    private final CompanyProfileService service;

    public CompanyProfileController(CompanyProfileService service) {
        this.service = service;
    }

    @GetMapping("/{employerId}")
    public CompanyProfileDto getProfile(@PathVariable Long employerId) {
        return service.getByEmployerId(employerId);
    }

    @PostMapping("/save")
    public CompanyProfileDto saveProfile(@RequestBody CompanyProfileDto dto) {
        return service.saveOrUpdate(dto);
    }
}
