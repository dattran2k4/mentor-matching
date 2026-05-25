package com.mentormatching.modules.scheduling.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.scheduling.domain.MentorAvailability;
import com.mentormatching.modules.scheduling.domain.MentorAvailabilityRestoreData;
import com.mentormatching.modules.scheduling.infrastructure.persistence.entity.MentorAvailabilityJpaEntity;

@Component
public class MentorAvailabilityPersistenceMapper {

    public MentorAvailability toDomain(MentorAvailabilityJpaEntity entity) {
        return MentorAvailability.restore(new MentorAvailabilityRestoreData(entity.getId(), entity.getMentorId(),
                entity.getAvailabilityType(), entity.getDayOfWeek(), entity.getAvailableDate(),
                entity.getStartTime(), entity.getEndTime(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public MentorAvailabilityJpaEntity toEntity(MentorAvailability mentorAvailability) {
        return MentorAvailabilityJpaEntity.builder()
                .id(mentorAvailability.getId())
                .mentorId(mentorAvailability.getMentorId())
                .availabilityType(mentorAvailability.getAvailabilityType())
                .dayOfWeek(mentorAvailability.getDayOfWeek())
                .availableDate(mentorAvailability.getAvailableDate())
                .startTime(mentorAvailability.getStartTime())
                .endTime(mentorAvailability.getEndTime())
                .createdAt(mentorAvailability.getCreatedAt())
                .updatedAt(mentorAvailability.getUpdatedAt())
                .build();
    }
}
