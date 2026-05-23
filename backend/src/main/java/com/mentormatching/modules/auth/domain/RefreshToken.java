package com.mentormatching.modules.auth.domain;

import java.time.LocalDateTime;
import java.util.Objects;

public class RefreshToken {

    private final Long id;
    private final Long userId;
    private final String token;
    private final LocalDateTime expiresAt;
    private LocalDateTime revokedAt;

    private RefreshToken(Long id, Long userId, String token, LocalDateTime expiresAt, LocalDateTime revokedAt) {
        this.id = id;
        this.userId = Objects.requireNonNull(userId, "User id must not be null");
        this.token = requireNotBlank(token);
        this.expiresAt = Objects.requireNonNull(expiresAt, "Refresh token expiration must not be null");
        this.revokedAt = revokedAt;
    }

    public static RefreshToken issue(Long userId, String token, long expiresInSeconds) {
        if (expiresInSeconds <= 0) {
            throw new IllegalArgumentException("Refresh token expiration must be positive");
        }
        return new RefreshToken(null, userId, token, LocalDateTime.now().plusSeconds(expiresInSeconds), null);
    }

    public static RefreshToken restore(Long id, Long userId, String token, LocalDateTime expiresAt,
                                       LocalDateTime revokedAt) {
        return new RefreshToken(id, userId, token, expiresAt, revokedAt);
    }

    public boolean isExpired() {
        return expiresAt.isBefore(LocalDateTime.now());
    }

    public boolean isRevoked() {
        return revokedAt != null;
    }

    public void revoke() {
        if (!isRevoked()) {
            revokedAt = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getToken() {
        return token;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public LocalDateTime getRevokedAt() {
        return revokedAt;
    }

    private static String requireNotBlank(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Refresh token must not be blank");
        }
        return value;
    }
}
