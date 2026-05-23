package com.mentormatching.modules.catalog.infrastructure.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.catalog.infrastructure.persistence.entity.CategoryJpaEntity;

public interface CategoryJpaRepository extends JpaRepository<CategoryJpaEntity, Long> {
}
