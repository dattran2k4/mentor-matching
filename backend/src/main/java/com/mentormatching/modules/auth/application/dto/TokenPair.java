package com.mentormatching.modules.auth.application.dto;

public record TokenPair(String accessToken, String refreshToken, long accessTokenExpiresIn, long refreshTokenExpiresIn) {
}
