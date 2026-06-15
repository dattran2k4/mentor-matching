package com.mentormatching.modules.scheduling.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.scheduling.application.dto.CreateCurrentMentorAvailabilityCommand;
import com.mentormatching.modules.scheduling.application.dto.UpdateCurrentMentorAvailabilityCommand;
import com.mentormatching.modules.scheduling.application.port.in.CreateCurrentMentorAvailabilityUseCase;
import com.mentormatching.modules.scheduling.application.port.in.DeleteCurrentMentorAvailabilityUseCase;
import com.mentormatching.modules.scheduling.application.port.in.UpdateCurrentMentorAvailabilityUseCase;
import com.mentormatching.modules.scheduling.application.port.out.MentorAvailabilityRepositoryPort;
import com.mentormatching.modules.scheduling.domain.MentorAvailability;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class SchedulingService implements CreateCurrentMentorAvailabilityUseCase, UpdateCurrentMentorAvailabilityUseCase,
        DeleteCurrentMentorAvailabilityUseCase {

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
        MentorProfile mentorProfile = getMentorProfile(command.userId());
        MentorAvailability availability = MentorAvailability.create(mentorProfile.getId(), command.availabilityType(),
                command.dayOfWeek(), command.availableDate(), command.startTime(), command.endTime());
        MentorAvailability savedAvailability = mentorAvailabilityRepositoryPort.save(availability);
        return savedAvailability.getId();
    }

    @Override
    @Transactional
    public void updateCurrentMentorAvailability(UpdateCurrentMentorAvailabilityCommand command) {
        MentorProfile mentorProfile = getMentorProfile(command.userId());
        MentorAvailability availability = mentorAvailabilityRepositoryPort.findById(command.availabilityId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor availability not found"));
        ensureAvailabilityBelongsToMentor(mentorProfile.getId(), availability);
        availability.update(command.availabilityType(), command.dayOfWeek(), command.availableDate(),
                command.startTime(), command.endTime());
        mentorAvailabilityRepositoryPort.save(availability);
    }

    @Override
    @Transactional
    public void deleteCurrentMentorAvailability(Long userId, Long availabilityId) {
        MentorProfile mentorProfile = getMentorProfile(userId);
        MentorAvailability availability = mentorAvailabilityRepositoryPort.findById(availabilityId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor availability not found"));
        ensureAvailabilityBelongsToMentor(mentorProfile.getId(), availability);
        mentorAvailabilityRepositoryPort.delete(availability);
    }

    private MentorProfile getMentorProfile(Long userId) {
        return mentorProfileRepositoryPort.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
    }

    private void ensureAvailabilityBelongsToMentor(Long mentorId, MentorAvailability availability) {
        if (!mentorId.equals(availability.getMentorId())) {
            throw new ResourceNotFoundException("Mentor availability not found");
        }
    }
}
