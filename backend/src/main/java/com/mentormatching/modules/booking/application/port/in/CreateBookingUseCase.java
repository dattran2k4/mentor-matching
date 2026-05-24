package com.mentormatching.modules.booking.application.port.in;

import com.mentormatching.modules.booking.application.dto.CreateBookingCommand;

public interface CreateBookingUseCase {

    Long createBooking(CreateBookingCommand command);
}
