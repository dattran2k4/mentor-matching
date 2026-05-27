package com.mentormatching.modules.scheduling.application.port.in;

import java.time.LocalDate;
import java.time.LocalTime;

public interface CheckMentorAvailabilityUseCase {

    boolean isMentorAvailable(Long mentorId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime);
}
