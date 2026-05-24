package com.mentormatching.modules.booking.domain;

import java.time.LocalDate;

public record BookingCreateData(Long studentUserId, Long mentorId, Long mentorSubjectId,
                                Long mentorAvailabilityId, LocalDate bookingDate,
                                BookingMeetingType meetingType, String note) {
}
