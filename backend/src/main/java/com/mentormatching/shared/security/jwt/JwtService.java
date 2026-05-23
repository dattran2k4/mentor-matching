package com.mentormatching.shared.security.jwt;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mentormatching.shared.security.model.AuthenticatedUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService implements JwtTokenProvider {

    private final SecretKey signingKey;
    private final long accessTokenExpirationMs;
    private final int refreshTokenBytes;
    private final SecureRandom secureRandom = new SecureRandom();

    public JwtService(@Value("${app.jwt.access-token-secret}") String secret,
                      @Value("${app.jwt.access-token-expiration-ms}") long accessTokenExpirationMs,
                      @Value("${app.refresh-token.byte-length:64}") int refreshTokenBytes) {
        this.signingKey = buildSigningKey(secret);
        this.accessTokenExpirationMs = accessTokenExpirationMs;
        if (refreshTokenBytes < 32) {
            throw new IllegalArgumentException("Refresh token byte length must be at least 32");
        }
        this.refreshTokenBytes = refreshTokenBytes;
    }

    @Override
    public AuthenticatedUser parseToken(String token) {
        return toPrincipal(extractAllClaims(token));
    }

    @Override
    public String generateToken(AuthenticatedUser user, TokenType tokenType) {
        return switch (Objects.requireNonNull(tokenType, "Token type must not be null")) {
            case ACCESS_TOKEN -> generateAccessToken(user);
            case REFRESH_TOKEN -> generateRefreshToken();
        };
    }

    private String generateAccessToken(AuthenticatedUser user) {
        Objects.requireNonNull(user, "Authenticated user must not be null when generating access token");

        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + accessTokenExpirationMs);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.id());
        claims.put("email", user.email());
        claims.put("role", user.role());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.username())
                .setIssuedAt(issuedAt)
                .setExpiration(expiresAt)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    private String generateRefreshToken() {
        byte[] token = new byte[refreshTokenBytes];
        secureRandom.nextBytes(token);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(token);
    }

    private AuthenticatedUser toPrincipal(Claims claims) {
        Long userId = claims.get("userId", Long.class);
        String username = claims.getSubject();
        String email = claims.get("email", String.class);
        String role = claims.get("role", String.class);

        return new AuthenticatedUser(userId, username, email, role == null ? "LEARNER" : role);
    }

    @Override
    public boolean isTokenExpired(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration != null && expiration.before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private SecretKey buildSigningKey(String secret) {
        try {
            byte[] decoded = Decoders.BASE64.decode(secret);
            return Keys.hmacShaKeyFor(decoded);
        } catch (IllegalArgumentException ex) {
            byte[] raw = secret.getBytes(StandardCharsets.UTF_8);
            return Keys.hmacShaKeyFor(raw);
        }
    }
}
