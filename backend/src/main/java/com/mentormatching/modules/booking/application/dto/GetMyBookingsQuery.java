package com.mentormatching.modules.booking.application.dto;

import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.booking.domain.BookingMeetingType;

public record GetMyBookingsQuery(Long studentUserId, int page, int size, String sortBy, String sortDir,
                                 BookingStatus status, BookingMeetingType meetingType) {
}
