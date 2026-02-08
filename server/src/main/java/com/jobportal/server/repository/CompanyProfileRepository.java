// src/main/java/com/jobportal/server/repository/CompanyProfileRepository.java
package com.jobportal.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.server.entity.CompanyProfile;

public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Long> {

    Optional<CompanyProfile> findByEmployerId(Long employerId);
}
