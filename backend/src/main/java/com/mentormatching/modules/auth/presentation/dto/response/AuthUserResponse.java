package com.mentormatching.modules.auth.presentation.dto.response;

import com.mentormatching.modules.auth.application.dto.AuthResult;

public record AuthUserResponse(Long id, String fullName, String email, String role) {

    public static AuthUserResponse from(AuthResult.UserResult user) {
        return new AuthUserResponse(user.id(), user.fullName(), user.email(), user.role());
    }
}
