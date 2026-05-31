package com.mentormatching.modules.mentor.application.dto;

import java.math.BigDecimal;

import com.mentormatching.modules.mentor.domain.ProficiencyLevel;

public record MentorSubjectDetail(Long id, Long subjectGradeId, Long subjectId, String subjectName, Long gradeId,
                                  String gradeName, ProficiencyLevel proficiencyLevel, String teachingNote,
                                  BigDecimal pricePerHour, Boolean active) {
}
