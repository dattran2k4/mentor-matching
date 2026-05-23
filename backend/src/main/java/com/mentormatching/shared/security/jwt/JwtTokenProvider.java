package com.mentormatching.shared.security.jwt;

import com.mentormatching.shared.security.model.AuthenticatedUser;

public interface JwtTokenProvider {

    AuthenticatedUser parseToken(String token);

    String generateToken(AuthenticatedUser user, TokenType tokenType);

    boolean isTokenExpired(String token);
}
