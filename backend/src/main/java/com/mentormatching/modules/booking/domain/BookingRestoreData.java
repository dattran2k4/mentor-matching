package com.mentormatching.modules.booking.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record BookingRestoreData(Long id, Long studentUserId, String studentName, Long mentorId, String mentorName,
                                 Long mentorSubjectId, String subjectName, String gradeName,
                                 Long mentorAvailabilityId, Long timeSlotId, LocalDate bookingDate,
                                 LocalTime startTime, LocalTime endTime, String timeSlotLabel,
                                 BigDecimal pricePerHour, BigDecimal totalAmount,
                                 BookingMeetingType meetingType, String meetingLink, String meetingAddress,
                                 BookingStatus status, String note, Long cancelledBy, String cancelReason,
                                 LocalDateTime createdAt, LocalDateTime updatedAt) {
}
