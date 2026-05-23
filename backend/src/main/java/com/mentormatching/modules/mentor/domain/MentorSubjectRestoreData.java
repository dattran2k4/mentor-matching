package com.mentormatching.modules.mentor.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record MentorSubjectRestoreData(Long id, Long mentorId, Long subjectGradeId,
                                       ProficiencyLevel proficiencyLevel, String teachingNote,
                                       BigDecimal pricePerHour, Boolean active,
                                       LocalDateTime createdAt, LocalDateTime updatedAt) {
}
