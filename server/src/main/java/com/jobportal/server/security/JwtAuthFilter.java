// server/src/main/java/com/jobportal/server/security/JwtAuthFilter.java
package com.jobportal.server.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

@Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
) throws ServletException, IOException {

    String path = request.getRequestURI();

    if (path.startsWith("/api/auth/") || "OPTIONS".equalsIgnoreCase(request.getMethod())) {
        filterChain.doFilter(request, response);
        return;
    }

    String header = request.getHeader("Authorization");
    System.out.println("JWT header for " + path + " = " + header);

    if (header != null && header.startsWith("Bearer ")) {
        String token = header.substring(7);

        try {
            String email = JwtUtil.extractUsername(token);
            String role = JwtUtil.extractRole(token); // e.g. "JOB_SEEKER" or "EMPLOYER"
            System.out.println("JWT parsed email=" + email + ", role=" + role);

            // normalize to Spring role format
            String springRole = switch (role) {
                case "JOB_SEEKER", "JOBSEEKER" -> "ROLE_JOBSEEKER";
                case "EMPLOYER" -> "ROLE_EMPLOYER";
                default -> "ROLE_USER";
            };

            UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    List.of(new SimpleGrantedAuthority(springRole))
                );

            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (Exception e) {
            e.printStackTrace();
            SecurityContextHolder.clearContext();
        }
    }

    filterChain.doFilter(request, response);
}
}
