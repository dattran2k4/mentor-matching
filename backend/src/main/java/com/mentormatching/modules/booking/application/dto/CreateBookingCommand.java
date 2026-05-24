package com.mentormatching.modules.booking.application.dto;

import java.time.LocalDate;

import com.mentormatching.modules.booking.domain.BookingMeetingType;

public record CreateBookingCommand(Long studentUserId, Long mentorId, Long mentorSubjectId,
                                   Long mentorAvailabilityId, LocalDate bookingDate,
                                   BookingMeetingType meetingType, String note) {
}
