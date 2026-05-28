package com.mentormatching.modules.booking.application.dto;

import java.time.LocalDate;

import com.mentormatching.modules.booking.domain.BookingMeetingType;
import com.mentormatching.modules.booking.domain.BookingStatus;

public record GetBookingsQuery(int page, int size, String sortBy, String sortDir, BookingStatus status,
                               BookingMeetingType meetingType, String mentorName, String studentName,
                               LocalDate bookingDateFrom, LocalDate bookingDateTo) {
}
