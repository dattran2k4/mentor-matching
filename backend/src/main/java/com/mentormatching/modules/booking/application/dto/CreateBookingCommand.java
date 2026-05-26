package com.mentormatching.modules.booking.application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.booking.domain.BookingMeetingType;

public record CreateBookingCommand(Long studentUserId, String studentName, Long mentorId, String mentorName,
                                   Long mentorSubjectId, String subjectName, String gradeName,
                                   LocalDate bookingDate, LocalTime startTime, LocalTime endTime,
                                   BigDecimal pricePerHour, BookingMeetingType meetingType, String note) {
}
