package com.mentormatching.modules.mentor.presentation.dto.response;

import java.math.BigDecimal;

import com.mentormatching.modules.mentor.application.dto.MentorSubjectDetail;
import com.mentormatching.modules.mentor.domain.ProficiencyLevel;

public record MentorSubjectDetailResponse(Long id, Long subjectGradeId, Long subjectId, String subjectName,
                                          Long gradeId, String gradeName, ProficiencyLevel proficiencyLevel,
                                          String teachingNote, BigDecimal pricePerHour, Boolean active) {

    public static MentorSubjectDetailResponse from(MentorSubjectDetail subject) {
        return new MentorSubjectDetailResponse(subject.id(), subject.subjectGradeId(), subject.subjectId(),
                subject.subjectName(), subject.gradeId(), subject.gradeName(), subject.proficiencyLevel(),
                subject.teachingNote(), subject.pricePerHour(), subject.active());
    }
}
