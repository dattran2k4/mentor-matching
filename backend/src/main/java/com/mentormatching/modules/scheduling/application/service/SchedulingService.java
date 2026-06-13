package com.mentormatching.modules.scheduling.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.scheduling.application.dto.CreateCurrentMentorAvailabilityCommand;
import com.mentormatching.modules.scheduling.application.dto.UpdateCurrentMentorAvailabilityCommand;
import com.mentormatching.modules.scheduling.application.port.in.CreateCurrentMentorAvailabilityUseCase;
import com.mentormatching.modules.scheduling.application.port.in.UpdateCurrentMentorAvailabilityUseCase;
import com.mentormatching.modules.scheduling.application.port.out.MentorAvailabilityRepositoryPort;
import com.mentormatching.modules.scheduling.domain.MentorAvailability;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class SchedulingService implements CreateCurrentMentorAvailabilityUseCase, UpdateCurrentMentorAvailabilityUseCase {

    private final MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort;
    private final MentorProfileRepositoryPort mentorProfileRepositoryPort;

    public SchedulingService(MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort,
                             MentorProfileRepositoryPort mentorProfileRepositoryPort) {
        this.mentorAvailabilityRepositoryPort = mentorAvailabilityRepositoryPort;
        this.mentorProfileRepositoryPort = mentorProfileRepositoryPort;
    }

    @Override
    @Transactional
    public Long createCurrentMentorAvailability(CreateCurrentMentorAvailabilityCommand command) {
        MentorProfile mentorProfile = mentorProfileRepositoryPort.findByUserId(command.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
        MentorAvailability availability = MentorAvailability.create(mentorProfile.getId(), command.availabilityType(),
                command.dayOfWeek(), command.availableDate(), command.startTime(), command.endTime());
        MentorAvailability savedAvailability = mentorAvailabilityRepositoryPort.save(availability);
        return savedAvailability.getId();
    }

    @Override
    @Transactional
    public void updateCurrentMentorAvailability(UpdateCurrentMentorAvailabilityCommand command) {
        MentorProfile mentorProfile = mentorProfileRepositoryPort.findByUserId(command.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
        MentorAvailability availability = mentorAvailabilityRepositoryPort.findById(command.availabilityId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor availability not found"));
        if (!mentorProfile.getId().equals(availability.getMentorId())) {
            throw new ResourceNotFoundException("Mentor availability not found");
        }
        availability.update(command.availabilityType(), command.dayOfWeek(), command.availableDate(),
                command.startTime(), command.endTime());
        mentorAvailabilityRepositoryPort.save(availability);
    }
}
