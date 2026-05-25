package com.mentormatching.modules.user.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.user.domain.LearnerProfile;
import com.mentormatching.modules.user.domain.LearnerProfileRestoreData;
import com.mentormatching.modules.user.infrastructure.persistence.entity.LearnerProfileJpaEntity;

@Component
public class LearnerProfilePersistenceMapper {

    public LearnerProfile toDomain(LearnerProfileJpaEntity entity) {
        return LearnerProfile.restore(new LearnerProfileRestoreData(entity.getId(), entity.getUserId(),
                entity.getGender(), entity.getBirthYear(), entity.getSchoolName(), entity.getGradeId(),
                entity.getLearningGoal(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public LearnerProfileJpaEntity toEntity(LearnerProfile learnerProfile) {
        return LearnerProfileJpaEntity.builder()
                .id(learnerProfile.getId())
                .userId(learnerProfile.getUserId())
                .gender(learnerProfile.getGender())
                .birthYear(learnerProfile.getBirthYear())
                .schoolName(learnerProfile.getSchoolName())
                .gradeId(learnerProfile.getGradeId())
                .learningGoal(learnerProfile.getLearningGoal())
                .createdAt(learnerProfile.getCreatedAt())
                .updatedAt(learnerProfile.getUpdatedAt())
                .build();
    }
}
