package com.jobportal.server.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.jobportal.server.entity.User;
import com.jobportal.server.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        // Adjust findByEmail to your UserRepository method name
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // Assuming User has getRole() like "EMPLOYER" or "JOBSEEKER"
        List<SimpleGrantedAuthority> authorities =
    List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()));


        return new CustomUserDetails(user, authorities);
    }
}
   