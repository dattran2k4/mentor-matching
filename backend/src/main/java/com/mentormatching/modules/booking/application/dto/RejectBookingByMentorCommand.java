package com.mentormatching.modules.booking.application.dto;

public record RejectBookingByMentorCommand(Long mentorUserId, Long bookingId, String cancelReason) {
}
