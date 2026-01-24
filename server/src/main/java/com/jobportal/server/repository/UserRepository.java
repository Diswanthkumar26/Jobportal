// src/main/java/com/jobportal/server/repository/UserRepository.java
package com.jobportal.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.server.entity.Role;
import com.jobportal.server.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    long countByRole(Role role);
}
