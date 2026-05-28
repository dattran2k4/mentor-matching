package com.mentormatching.modules.booking.infrastructure.lookup;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.application.port.out.BookingAvailabilityLookupPort;
import com.mentormatching.modules.scheduling.application.port.in.CheckMentorAvailabilityUseCase;

@Component
public class BookingAvailabilityLookupAdapter implements BookingAvailabilityLookupPort {

    private final CheckMentorAvailabilityUseCase checkMentorAvailabilityUseCase;

    public BookingAvailabilityLookupAdapter(CheckMentorAvailabilityUseCase checkMentorAvailabilityUseCase) {
        this.checkMentorAvailabilityUseCase = checkMentorAvailabilityUseCase;
    }

    @Override
    public boolean isMentorAvailable(Long mentorId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime) {
        return checkMentorAvailabilityUseCase.isMentorAvailable(mentorId, bookingDate, startTime, endTime);
    }
}
