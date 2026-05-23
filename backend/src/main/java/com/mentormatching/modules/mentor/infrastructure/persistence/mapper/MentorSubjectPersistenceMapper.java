package com.mentormatching.modules.mentor.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.mentor.domain.MentorSubject;
import com.mentormatching.modules.mentor.domain.MentorSubjectRestoreData;
import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorSubjectJpaEntity;

@Component
public class MentorSubjectPersistenceMapper {

    public MentorSubject toDomain(MentorSubjectJpaEntity entity) {
        return MentorSubject.restore(new MentorSubjectRestoreData(entity.getId(), entity.getMentorId(),
                entity.getSubjectGradeId(), entity.getProficiencyLevel(), entity.getTeachingNote(),
                entity.getPricePerHour(), entity.getActive(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public MentorSubjectJpaEntity toEntity(MentorSubject mentorSubject) {
        return MentorSubjectJpaEntity.builder()
                .id(mentorSubject.getId())
                .mentorId(mentorSubject.getMentorId())
                .subjectGradeId(mentorSubject.getSubjectGradeId())
                .proficiencyLevel(mentorSubject.getProficiencyLevel())
                .teachingNote(mentorSubject.getTeachingNote())
                .pricePerHour(mentorSubject.getPricePerHour())
                .active(mentorSubject.getActive())
                .createdAt(mentorSubject.getCreatedAt())
                .updatedAt(mentorSubject.getUpdatedAt())
                .build();
    }
}
