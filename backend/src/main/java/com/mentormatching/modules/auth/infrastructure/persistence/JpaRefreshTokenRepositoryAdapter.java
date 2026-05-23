package com.mentormatching.modules.auth.infrastructure.persistence;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.auth.application.port.out.RefreshTokenRepositoryPort;
import com.mentormatching.modules.auth.domain.RefreshToken;
import com.mentormatching.modules.auth.infrastructure.persistence.entity.AuthRefreshTokenJpaEntity;
import com.mentormatching.modules.auth.infrastructure.persistence.repository.AuthRefreshTokenJpaRepository;
import com.mentormatching.modules.auth.infrastructure.persistence.support.RefreshTokenHasher;

@Component
public class JpaRefreshTokenRepositoryAdapter implements RefreshTokenRepositoryPort {

    private final AuthRefreshTokenJpaRepository authRefreshTokenJpaRepository;
    private final RefreshTokenHasher refreshTokenHasher;

    public JpaRefreshTokenRepositoryAdapter(AuthRefreshTokenJpaRepository authRefreshTokenJpaRepository,
                                            RefreshTokenHasher refreshTokenHasher) {
        this.authRefreshTokenJpaRepository = authRefreshTokenJpaRepository;
        this.refreshTokenHasher = refreshTokenHasher;
    }

    @Override
    public void save(RefreshToken refreshToken) {
        authRefreshTokenJpaRepository.save(AuthRefreshTokenJpaEntity.builder()
                .userId(refreshToken.getUserId())
                .tokenHash(refreshTokenHasher.hash(refreshToken.getToken()))
                .expiresAt(refreshToken.getExpiresAt())
                .revokedAt(refreshToken.getRevokedAt())
                .build());
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return authRefreshTokenJpaRepository.findByTokenHash(refreshTokenHasher.hash(token))
                .map(entity -> RefreshToken.restore(entity.getId(), entity.getUserId(), token, entity.getExpiresAt(),
                        entity.getRevokedAt()));
    }

    @Override
    public void revoke(RefreshToken refreshToken) {
        authRefreshTokenJpaRepository.findByTokenHash(refreshTokenHasher.hash(refreshToken.getToken()))
                .ifPresent(entity -> {
                    entity.setRevokedAt(refreshToken.getRevokedAt());
                    authRefreshTokenJpaRepository.save(entity);
                });
    }
}
