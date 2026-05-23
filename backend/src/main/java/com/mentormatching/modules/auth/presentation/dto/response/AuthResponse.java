package com.mentormatching.modules.auth.presentation.dto.response;

import com.mentormatching.modules.auth.application.dto.AuthResult;

public record AuthResponse(String accessToken, long accessTokenExpiresIn, long refreshTokenExpiresIn,
                           AuthUserResponse user) {

    public static AuthResponse from(AuthResult result) {
        return new AuthResponse(result.accessToken(), result.accessTokenExpiresIn(), result.refreshTokenExpiresIn(),
                AuthUserResponse.from(result.user()));
    }
}
