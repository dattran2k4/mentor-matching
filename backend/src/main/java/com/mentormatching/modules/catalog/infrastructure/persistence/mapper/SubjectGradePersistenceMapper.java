package com.mentormatching.modules.catalog.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.catalog.domain.SubjectGrade;
import com.mentormatching.modules.catalog.domain.SubjectGradeRestoreData;
import com.mentormatching.modules.catalog.infrastructure.persistence.entity.SubjectGradeJpaEntity;

@Component
public class SubjectGradePersistenceMapper {

    public SubjectGrade toDomain(SubjectGradeJpaEntity entity) {
        return SubjectGrade.restore(new SubjectGradeRestoreData(entity.getId(), entity.getSubjectId(),
                entity.getGradeId(), entity.getCreatedAt()));
    }

    public SubjectGradeJpaEntity toEntity(SubjectGrade subjectGrade) {
        return SubjectGradeJpaEntity.builder()
                .id(subjectGrade.getId())
                .subjectId(subjectGrade.getSubjectId())
                .gradeId(subjectGrade.getGradeId())
                .createdAt(subjectGrade.getCreatedAt())
                .build();
    }
}
