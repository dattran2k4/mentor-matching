package com.mentormatching.modules.user.presentation.dto.response;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

public record CurrentUserResponse(Long id, String fullName, String email, String role) {

    public static CurrentUserResponse from(AuthenticatedPrincipal principal, Authentication authentication) {
        String role = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .filter(authority -> authority.startsWith("ROLE_"))
                .map(authority -> authority.substring("ROLE_".length()))
                .findFirst()
                .orElse(null);
        return new CurrentUserResponse(principal.getId(), principal.getFullName(), principal.getEmail(), role);
    }
}
