package com.mentormatching.modules.booking.application.dto;

import java.math.BigDecimal;

public record BookingMentorSubjectSnapshot(Long mentorSubjectId, Long mentorId, String subjectName, String gradeName,
                                           BigDecimal pricePerHour, boolean active) {
}
