package com.mentormatching.modules.user.infrastructure.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mentormatching.modules.user.application.port.out.UserReadPort;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserReadPort userReadPort;

    public CustomUserDetailsService(UserReadPort userReadPort) {
        this.userReadPort = userReadPort;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return userReadPort.findByEmail(username)
                .map(CustomUserDetails::from)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }
}
