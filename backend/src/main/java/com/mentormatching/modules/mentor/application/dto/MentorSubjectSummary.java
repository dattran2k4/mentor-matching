package com.mentormatching.modules.mentor.application.dto;

import java.math.BigDecimal;

public record MentorSubjectSummary(Long mentorSubjectId, Long mentorId, Long subjectGradeId,
                                   BigDecimal pricePerHour, boolean active) {
}
