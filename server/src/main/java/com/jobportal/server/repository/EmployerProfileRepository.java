// server/src/main/java/com/jobportal/server/repository/EmployerProfileRepository.java
package com.jobportal.server.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.server.entity.EmployerProfile;

public interface EmployerProfileRepository extends JpaRepository<EmployerProfile, Long> {

    Optional<EmployerProfile> findByUserEmail(String email);
}
