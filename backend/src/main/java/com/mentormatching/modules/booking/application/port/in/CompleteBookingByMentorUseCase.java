package com.mentormatching.modules.booking.application.port.in;

public interface CompleteBookingByMentorUseCase {

    void completeBookingByMentor(Long mentorUserId, Long bookingId);
}
