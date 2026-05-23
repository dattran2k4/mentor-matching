package com.mentormatching.modules.auth.infrastructure.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.auth.infrastructure.persistence.entity.AuthRefreshTokenJpaEntity;

public interface AuthRefreshTokenJpaRepository extends JpaRepository<AuthRefreshTokenJpaEntity, Long> {

    Optional<AuthRefreshTokenJpaEntity> findByTokenHash(String tokenHash);
}
