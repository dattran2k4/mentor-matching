package com.mentormatching.modules.scheduling.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.scheduling.domain.MentorAvailability;
import com.mentormatching.modules.scheduling.domain.MentorAvailabilityRestoreData;
import com.mentormatching.modules.scheduling.infrastructure.persistence.entity.MentorAvailabilityJpaEntity;

@Component
public class MentorAvailabilityPersistenceMapper {

    public MentorAvailability toDomain(MentorAvailabilityJpaEntity entity) {
        return MentorAvailability.restore(new MentorAvailabilityRestoreData(entity.getId(), entity.getMentorId(),
                entity.getTimeSlotId(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public MentorAvailabilityJpaEntity toEntity(MentorAvailability mentorAvailability) {
        return MentorAvailabilityJpaEntity.builder()
                .id(mentorAvailability.getId())
                .mentorId(mentorAvailability.getMentorId())
                .timeSlotId(mentorAvailability.getTimeSlotId())
                .createdAt(mentorAvailability.getCreatedAt())
                .updatedAt(mentorAvailability.getUpdatedAt())
                .build();
    }
}
