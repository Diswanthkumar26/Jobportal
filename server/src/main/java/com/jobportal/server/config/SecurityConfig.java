
package com.jobportal.server.config;

import com.jobportal.server.security.JwtAuthFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

   @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())
        .cors(Customizer.withDefaults())
        .sessionManagement(sm ->
            sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )

.authorizeHttpRequests(auth -> auth
    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
    .requestMatchers("/api/auth/**").permitAll()

    .requestMatchers(HttpMethod.GET, "/api/jobs", "/api/jobs/**").permitAll()

    .requestMatchers(HttpMethod.POST, "/api/jobs/**").authenticated()
    .requestMatchers(HttpMethod.PUT, "/api/jobs/**").authenticated()
    .requestMatchers(HttpMethod.DELETE, "/api/jobs/**").authenticated()
    .requestMatchers("/api/employer/**").authenticated()
    .requestMatchers("/api/profile/job-seeker/**").authenticated()
    .requestMatchers("/api/profile/employer/**").authenticated()
    .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
    .requestMatchers("/api/users/**").authenticated()
    .requestMatchers("/api/applications/**").authenticated()
    .requestMatchers("/api/saved-jobs/**").authenticated()
    .anyRequest().authenticated()
)


        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
