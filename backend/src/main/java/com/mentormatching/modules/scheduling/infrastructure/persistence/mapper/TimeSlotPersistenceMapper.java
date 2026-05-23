package com.mentormatching.modules.scheduling.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.scheduling.domain.TimeSlot;
import com.mentormatching.modules.scheduling.domain.TimeSlotRestoreData;
import com.mentormatching.modules.scheduling.infrastructure.persistence.entity.TimeSlotJpaEntity;

@Component
public class TimeSlotPersistenceMapper {

    public TimeSlot toDomain(TimeSlotJpaEntity entity) {
        return TimeSlot.restore(new TimeSlotRestoreData(entity.getId(), entity.getDayOfWeek(), entity.getLabel(),
                entity.getStartTime(), entity.getEndTime(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public TimeSlotJpaEntity toEntity(TimeSlot timeSlot) {
        return TimeSlotJpaEntity.builder()
                .id(timeSlot.getId())
                .dayOfWeek(timeSlot.getDayOfWeek())
                .label(timeSlot.getLabel())
                .startTime(timeSlot.getStartTime())
                .endTime(timeSlot.getEndTime())
                .createdAt(timeSlot.getCreatedAt())
                .updatedAt(timeSlot.getUpdatedAt())
                .build();
    }
}
