package com.mentormatching.modules.mentor.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.mentor.domain.MentorAchievement;
import com.mentormatching.modules.mentor.domain.MentorAchievementRestoreData;
import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorAchievementJpaEntity;

@Component
public class MentorAchievementPersistenceMapper {

    public MentorAchievement toDomain(MentorAchievementJpaEntity entity) {
        return MentorAchievement.restore(new MentorAchievementRestoreData(entity.getId(), entity.getMentorId(),
                entity.getTitle(), entity.getDescription(), entity.getAchievementType(), entity.getIssuer(),
                entity.getAchievedAt(), entity.getProofUrl(), entity.getVerified(), entity.getVerifiedBy(),
                entity.getVerifiedAt(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public MentorAchievementJpaEntity toEntity(MentorAchievement mentorAchievement) {
        return MentorAchievementJpaEntity.builder()
                .id(mentorAchievement.getId())
                .mentorId(mentorAchievement.getMentorId())
                .title(mentorAchievement.getTitle())
                .description(mentorAchievement.getDescription())
                .achievementType(mentorAchievement.getAchievementType())
                .issuer(mentorAchievement.getIssuer())
                .achievedAt(mentorAchievement.getAchievedAt())
                .proofUrl(mentorAchievement.getProofUrl())
                .verified(mentorAchievement.getVerified())
                .verifiedBy(mentorAchievement.getVerifiedBy())
                .verifiedAt(mentorAchievement.getVerifiedAt())
                .createdAt(mentorAchievement.getCreatedAt())
                .updatedAt(mentorAchievement.getUpdatedAt())
                .build();
    }
}
