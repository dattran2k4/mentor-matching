package com.mentormatching.modules.catalog.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.catalog.domain.Subject;
import com.mentormatching.modules.catalog.domain.SubjectRestoreData;
import com.mentormatching.modules.catalog.infrastructure.persistence.entity.SubjectJpaEntity;

@Component
public class SubjectPersistenceMapper {

    public Subject toDomain(SubjectJpaEntity entity) {
        return Subject.restore(new SubjectRestoreData(entity.getId(), entity.getCategoryId(), entity.getName(),
                entity.getDescription(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public SubjectJpaEntity toEntity(Subject subject) {
        return SubjectJpaEntity.builder()
                .id(subject.getId())
                .categoryId(subject.getCategoryId())
                .name(subject.getName())
                .description(subject.getDescription())
                .createdAt(subject.getCreatedAt())
                .updatedAt(subject.getUpdatedAt())
                .build();
    }
}
