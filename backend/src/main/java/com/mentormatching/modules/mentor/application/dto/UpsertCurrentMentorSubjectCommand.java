package com.mentormatching.modules.mentor.application.dto;

import java.math.BigDecimal;

import com.mentormatching.modules.mentor.domain.ProficiencyLevel;

public record UpsertCurrentMentorSubjectCommand(Long userId, Long id, Long subjectGradeId,
                                                ProficiencyLevel proficiencyLevel, String teachingNote,
                                                BigDecimal pricePerHour, Boolean active) {
}
