package com.jobportal.server.repository;

import com.jobportal.server.entity.EmployerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerProfileRepository
        extends JpaRepository<EmployerProfile, Long> {
}
