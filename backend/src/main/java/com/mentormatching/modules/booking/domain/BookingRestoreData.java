package com.mentormatching.modules.booking.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingRestoreData(Long id, Long studentUserId, Long mentorId, Long mentorSubjectId,
                                 Long mentorAvailabilityId, LocalDate bookingDate,
                                 BookingMeetingType meetingType, String meetingLink, String meetingAddress,
                                 BookingStatus status, String note, Long cancelledBy, String cancelReason,
                                 LocalDateTime createdAt, LocalDateTime updatedAt) {
}
