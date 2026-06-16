package com.mentormatching.modules.scheduling.application.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.scheduling.application.dto.CurrentMentorAvailabilityDetail;
import com.mentormatching.modules.scheduling.application.port.in.CheckMentorAvailabilityUseCase;
import com.mentormatching.modules.scheduling.application.port.in.GetCurrentMentorAvailabilitiesUseCase;
import com.mentormatching.modules.scheduling.application.port.out.MentorAvailabilityRepositoryPort;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.modules.scheduling.domain.MentorAvailability;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class SchedulingQueryService implements CheckMentorAvailabilityUseCase, GetCurrentMentorAvailabilitiesUseCase {

    private final MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort;
    private final MentorProfileRepositoryPort mentorProfileRepositoryPort;

    public SchedulingQueryService(MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort,
                                  MentorProfileRepositoryPort mentorProfileRepositoryPort) {
        this.mentorAvailabilityRepositoryPort = mentorAvailabilityRepositoryPort;
        this.mentorProfileRepositoryPort = mentorProfileRepositoryPort;
    }

    @Override
    public boolean isMentorAvailable(Long mentorId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime) {
        return mentorAvailabilityRepositoryPort.findByMentorId(mentorId)
                .stream()
                .anyMatch(availability -> matches(availability, bookingDate, startTime, endTime));
    }

    @Override
    public List<CurrentMentorAvailabilityDetail> getCurrentMentorAvailabilities(Long userId) {
        MentorProfile mentorProfile = mentorProfileRepositoryPort.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
        return mentorAvailabilityRepositoryPort.findByMentorId(mentorProfile.getId()).stream()
                .map(this::toCurrentMentorAvailabilityDetail)
                .toList();
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

    private CurrentMentorAvailabilityDetail toCurrentMentorAvailabilityDetail(MentorAvailability availability) {
        return new CurrentMentorAvailabilityDetail(availability.getId(), availability.getAvailabilityType(),
                availability.getDayOfWeek(), availability.getAvailableDate(), availability.getStartTime(),
                availability.getEndTime());
    }
}
