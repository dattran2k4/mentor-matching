package com.mentormatching.modules.booking.application.port.in;

import com.mentormatching.modules.booking.application.dto.RejectBookingByMentorCommand;

public interface RejectBookingByMentorUseCase {

    void rejectBookingByMentor(RejectBookingByMentorCommand command);
}
