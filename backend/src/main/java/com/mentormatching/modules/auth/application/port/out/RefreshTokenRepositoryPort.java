package com.mentormatching.modules.auth.application.port.out;

import java.util.Optional;

import com.mentormatching.modules.auth.domain.RefreshToken;

public interface RefreshTokenRepositoryPort {

    void save(RefreshToken refreshToken);

    Optional<RefreshToken> findByToken(String token);

    void revoke(RefreshToken refreshToken);
}
