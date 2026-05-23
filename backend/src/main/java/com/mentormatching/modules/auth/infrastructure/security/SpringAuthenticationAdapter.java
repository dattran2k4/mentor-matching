package com.mentormatching.modules.auth.infrastructure.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.auth.application.dto.TokenSubject;
import com.mentormatching.modules.auth.application.port.out.AuthenticationPort;
import com.mentormatching.shared.exception.AuthenticationFailedException;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

@Component
public class SpringAuthenticationAdapter implements AuthenticationPort {

    private final AuthenticationManager authenticationManager;

    public SpringAuthenticationAdapter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public TokenSubject authenticate(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));

            if (!(authentication.getPrincipal() instanceof AuthenticatedPrincipal principal)) {
                throw new InvalidDataException("Invalid authenticated principal");
            }

            String role = authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .filter(authority -> authority.startsWith("ROLE_"))
                    .map(authority -> authority.substring("ROLE_".length()))
                    .findFirst()
                    .orElseThrow(() -> new InvalidDataException("Authenticated principal does not have a role"));
            return new TokenSubject(principal.getId(), principal.getFullName(), principal.getEmail(), role);
        } catch (AuthenticationException ex) {
            throw new AuthenticationFailedException("Invalid email or password");
        }
    }
}
