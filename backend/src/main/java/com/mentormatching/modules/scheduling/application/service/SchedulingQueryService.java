package com.mentormatching.modules.scheduling.application.service;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.scheduling.application.port.in.CheckMentorAvailabilityUseCase;
import com.mentormatching.modules.scheduling.application.port.out.MentorAvailabilityRepositoryPort;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.modules.scheduling.domain.MentorAvailability;

@Service
public class SchedulingQueryService implements CheckMentorAvailabilityUseCase {

    private final MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort;

    public SchedulingQueryService(MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort) {
        this.mentorAvailabilityRepositoryPort = mentorAvailabilityRepositoryPort;
    }

    @Override
    public boolean isMentorAvailable(Long mentorId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime) {
        return mentorAvailabilityRepositoryPort.findByMentorId(mentorId)
                .stream()
                .anyMatch(availability -> matches(availability, bookingDate, startTime, endTime));
    }

    private boolean matches(MentorAvailability availability, LocalDate bookingDate, LocalTime startTime,
                            LocalTime endTime) {
        return matchesDate(availability, bookingDate)
                && !startTime.isBefore(availability.getStartTime())
                && !endTime.isAfter(availability.getEndTime());
    }

    private boolean matchesDate(MentorAvailability availability, LocalDate bookingDate) {
        if (availability.getAvailabilityType() == AvailabilityType.RECURRING) {
            return availability.getDayOfWeek() != null
                    && availability.getDayOfWeek() == bookingDate.getDayOfWeek().getValue();
        }
        return availability.getAvailableDate() != null && availability.getAvailableDate().isEqual(bookingDate);
    }
}
