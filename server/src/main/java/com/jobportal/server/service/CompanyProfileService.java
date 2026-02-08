// src/main/java/com/jobportal/server/service/CompanyProfileService.java
package com.jobportal.server.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.server.dto.CompanyProfileDto;
import com.jobportal.server.entity.CompanyProfile;
import com.jobportal.server.repository.CompanyProfileRepository;

@Service
public class CompanyProfileService {

    private final CompanyProfileRepository repository;

    public CompanyProfileService(CompanyProfileRepository repository) {
        this.repository = repository;
    }

    public CompanyProfileDto getByEmployerId(Long employerId) {
        return repository.findByEmployerId(employerId)
                .map(this::toDto)
                .orElse(null);
    }

    @Transactional
    public CompanyProfileDto saveOrUpdate(CompanyProfileDto dto) {
        CompanyProfile entity = repository.findByEmployerId(dto.getEmployerId())
                .orElseGet(CompanyProfile::new);

        entity.setEmployerId(dto.getEmployerId());
        entity.setCompanyName(dto.getCompanyName());
        entity.setWebsite(dto.getWebsite());
        entity.setLocation(dto.getLocation());
        entity.setIndustry(dto.getIndustry());
        entity.setDescription(dto.getDescription());
        entity.setSize(dto.getSize());
        entity.setFoundedYear(dto.getFoundedYear());
        entity.setLogoUrl(dto.getLogoUrl());
        entity.setBenefits(dto.getBenefits());
        entity.setCulture(dto.getCulture());

        CompanyProfile saved = repository.save(entity);
        return toDto(saved);
    }

    private CompanyProfileDto toDto(CompanyProfile entity) {
        CompanyProfileDto dto = new CompanyProfileDto();
        dto.setEmployerId(entity.getEmployerId());
        dto.setCompanyName(entity.getCompanyName());
        dto.setWebsite(entity.getWebsite());
        dto.setLocation(entity.getLocation());
        dto.setIndustry(entity.getIndustry());
        dto.setDescription(entity.getDescription());
        dto.setSize(entity.getSize());
        dto.setFoundedYear(entity.getFoundedYear());
        dto.setLogoUrl(entity.getLogoUrl());
        dto.setBenefits(entity.getBenefits());
        dto.setCulture(entity.getCulture());
        return dto;
    }
}
