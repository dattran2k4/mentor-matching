package com.mentormatching.modules.auth.infrastructure.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.auth.application.dto.TokenPair;
import com.mentormatching.modules.auth.application.dto.TokenSubject;
import com.mentormatching.modules.auth.application.port.out.TokenProviderPort;
import com.mentormatching.shared.security.jwt.JwtTokenProvider;
import com.mentormatching.shared.security.jwt.TokenType;
import com.mentormatching.shared.security.model.AuthenticatedUser;

@Component
public class JwtTokenProviderAdapter implements TokenProviderPort {

    private final JwtTokenProvider jwtTokenProvider;
    private final long accessTokenExpirationMs;
    private final long refreshTokenExpirationMs;

    public JwtTokenProviderAdapter(JwtTokenProvider jwtTokenProvider,
                                   @Value("${app.jwt.access-token-expiration-ms}") long accessTokenExpirationMs,
                                   @Value("${app.refresh-token.expiration-ms}") long refreshTokenExpirationMs) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.accessTokenExpirationMs = accessTokenExpirationMs;
        this.refreshTokenExpirationMs = refreshTokenExpirationMs;
    }

    @Override
    public TokenPair issueTokens(TokenSubject subject) {
        AuthenticatedUser user = new AuthenticatedUser(subject.id(), subject.fullName(), subject.email(),
                subject.role());

        return new TokenPair(jwtTokenProvider.generateToken(user, TokenType.ACCESS_TOKEN), jwtTokenProvider.generateToken(user, TokenType.REFRESH_TOKEN),
                accessTokenExpirationMs / 1000, refreshTokenExpirationMs / 1000);
    }
}
