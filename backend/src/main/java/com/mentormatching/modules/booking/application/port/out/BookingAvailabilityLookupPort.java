package com.mentormatching.modules.booking.application.port.out;

import java.time.LocalDate;
import java.time.LocalTime;

public interface BookingAvailabilityLookupPort {

    boolean isMentorAvailable(Long mentorId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime);
}
