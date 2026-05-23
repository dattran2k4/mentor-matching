package com.mentormatching.modules.auth.application.dto;

public record AuthResult(String accessToken, String refreshToken, long accessTokenExpiresIn, long refreshTokenExpiresIn, UserResult user) {

    public record UserResult(Long id, String fullName, String email, String role) {
    }
}
