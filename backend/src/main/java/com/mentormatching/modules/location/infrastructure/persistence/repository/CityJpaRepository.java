package com.mentormatching.modules.location.infrastructure.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.location.infrastructure.persistence.entity.CityJpaEntity;

public interface CityJpaRepository extends JpaRepository<CityJpaEntity, Long> {

    Optional<CityJpaEntity> findByCode(String code);
}
