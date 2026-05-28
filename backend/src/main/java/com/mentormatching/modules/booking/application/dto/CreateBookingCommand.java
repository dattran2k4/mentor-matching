package com.mentormatching.modules.booking.application.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.booking.domain.BookingMeetingType;

public record CreateBookingCommand(Long studentUserId, Long mentorId, Long mentorSubjectId, LocalDate bookingDate,
                                   LocalTime startTime, LocalTime endTime, BookingMeetingType meetingType,
                                   String note) {
}
