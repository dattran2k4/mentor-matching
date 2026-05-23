package com.mentormatching.modules.catalog.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.catalog.domain.Grade;
import com.mentormatching.modules.catalog.domain.GradeRestoreData;
import com.mentormatching.modules.catalog.infrastructure.persistence.entity.GradeJpaEntity;

@Component
public class GradePersistenceMapper {

    public Grade toDomain(GradeJpaEntity entity) {
        return Grade.restore(new GradeRestoreData(entity.getId(), entity.getName(), entity.getLevelGroup(),
                entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public GradeJpaEntity toEntity(Grade grade) {
        return GradeJpaEntity.builder()
                .id(grade.getId())
                .name(grade.getName())
                .levelGroup(grade.getLevelGroup())
                .createdAt(grade.getCreatedAt())
                .updatedAt(grade.getUpdatedAt())
                .build();
    }
}
