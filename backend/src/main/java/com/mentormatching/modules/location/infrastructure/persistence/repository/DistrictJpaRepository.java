package com.mentormatching.modules.location.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.location.infrastructure.persistence.entity.DistrictJpaEntity;

public interface DistrictJpaRepository extends JpaRepository<DistrictJpaEntity, Long> {

    List<DistrictJpaEntity> findByCityId(Long cityId);
}
