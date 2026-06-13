package com.mentormatching.modules.scheduling.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorProfileRestoreData;
import com.mentormatching.modules.scheduling.application.dto.CreateCurrentMentorAvailabilityCommand;
import com.mentormatching.modules.scheduling.application.port.out.MentorAvailabilityRepositoryPort;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.modules.scheduling.domain.MentorAvailability;
import com.mentormatching.modules.scheduling.domain.MentorAvailabilityRestoreData;
import com.mentormatching.shared.exception.ResourceNotFoundException;

class SchedulingServiceTest {

    private MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort;
    private MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private SchedulingService schedulingService;

    @BeforeEach
    void setUp() {
        mentorAvailabilityRepositoryPort = mock(MentorAvailabilityRepositoryPort.class);
        mentorProfileRepositoryPort = mock(MentorProfileRepositoryPort.class);
        schedulingService = new SchedulingService(mentorAvailabilityRepositoryPort, mentorProfileRepositoryPort);
    }

    @Test
    void createCurrentMentorAvailabilityCreatesRecurringAvailability() {
        MentorProfile mentorProfile = mentorProfile();
        CreateCurrentMentorAvailabilityCommand command = new CreateCurrentMentorAvailabilityCommand(20L,
                AvailabilityType.RECURRING, 1, null, LocalTime.of(9, 0), LocalTime.of(11, 0));
        MentorAvailability savedAvailability = MentorAvailability.restore(new MentorAvailabilityRestoreData(100L, 10L,
                AvailabilityType.RECURRING, 1, null, LocalTime.of(9, 0), LocalTime.of(11, 0),
                LocalDateTime.parse("2026-06-13T10:00:00"), LocalDateTime.parse("2026-06-13T10:00:00")));

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorAvailabilityRepositoryPort.save(org.mockito.ArgumentMatchers.any(MentorAvailability.class)))
                .thenReturn(savedAvailability);

        Long actual = schedulingService.createCurrentMentorAvailability(command);

        assertEquals(100L, actual);
    }

    @Test
    void createCurrentMentorAvailabilityCreatesSpecificDateAvailability() {
        MentorProfile mentorProfile = mentorProfile();
        CreateCurrentMentorAvailabilityCommand command = new CreateCurrentMentorAvailabilityCommand(20L,
                AvailabilityType.SPECIFIC_DATE, null, LocalDate.parse("2026-06-20"), LocalTime.of(14, 0),
                LocalTime.of(16, 0));
        MentorAvailability savedAvailability = MentorAvailability.restore(new MentorAvailabilityRestoreData(101L, 10L,
                AvailabilityType.SPECIFIC_DATE, null, LocalDate.parse("2026-06-20"), LocalTime.of(14, 0),
                LocalTime.of(16, 0), LocalDateTime.parse("2026-06-13T10:00:00"),
                LocalDateTime.parse("2026-06-13T10:00:00")));

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorAvailabilityRepositoryPort.save(org.mockito.ArgumentMatchers.any(MentorAvailability.class)))
                .thenReturn(savedAvailability);

        Long actual = schedulingService.createCurrentMentorAvailability(command);

        assertEquals(101L, actual);
    }

    @Test
    void createCurrentMentorAvailabilityThrowsWhenMentorProfileDoesNotExist() {
        CreateCurrentMentorAvailabilityCommand command = new CreateCurrentMentorAvailabilityCommand(99L,
                AvailabilityType.RECURRING, 1, null, LocalTime.of(9, 0), LocalTime.of(11, 0));

        when(mentorProfileRepositoryPort.findByUserId(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> schedulingService.createCurrentMentorAvailability(command));

        assertEquals("Mentor profile not found", exception.getMessage());
    }

    private MentorProfile mentorProfile() {
        return MentorProfile.restore(new MentorProfileRestoreData(10L, 20L, "https://example.com/avatar.jpg",
                Gender.FEMALE, 1L, 2L, "Headline", "Intro", "Style", 6, "Teacher", "Mentor Matching", "HCMUS",
                "Mathematics", MeetingType.HYBRID, MentorApprovalStatus.PENDING, null, null, null,
                LocalDateTime.parse("2026-06-01T10:15:30"), LocalDateTime.parse("2026-06-05T12:00:00")));
    }
}
