package com.mentormatching.modules.mentor.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorDetails;
import com.mentormatching.modules.mentor.application.port.out.MentorCatalogLookupPort;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorReadRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorSubjectRepositoryPort;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;
import com.mentormatching.shared.exception.ResourceNotFoundException;

class MentorQueryServiceTest {

    private MentorReadRepositoryPort mentorReadRepositoryPort;
    private MentorQueryService mentorQueryService;

    @BeforeEach
    void setUp() {
        MentorProfileRepositoryPort mentorProfileRepositoryPort = mock(MentorProfileRepositoryPort.class);
        MentorSubjectRepositoryPort mentorSubjectRepositoryPort = mock(MentorSubjectRepositoryPort.class);
        mentorReadRepositoryPort = mock(MentorReadRepositoryPort.class);
        MentorCatalogLookupPort mentorCatalogLookupPort = mock(MentorCatalogLookupPort.class);

        mentorQueryService = new MentorQueryService(mentorProfileRepositoryPort, mentorSubjectRepositoryPort,
                mentorReadRepositoryPort, mentorCatalogLookupPort);
    }

    @Test
    void getCurrentMentorReturnsCurrentMentorDetails() {
        CurrentMentorDetails expected = new CurrentMentorDetails(10L, 20L, "Nguyen Minh Anh",
                "https://example.com/avatar.jpg", Gender.FEMALE, 1L, "Ha Noi", 2L, "Ho Chi Minh City", 3L,
                "District 1", "Experienced Math Mentor", "Helping learners build confidence",
                "Concept-first with practice", 6, "Math Teacher", "Mentor Matching", "HCMUS", "Mathematics",
                MeetingType.HYBRID, MentorApprovalStatus.APPROVED, "Approved", MentorVerificationStatus.VERIFIED,
                null, LocalDateTime.parse("2026-06-01T10:15:30"), LocalDateTime.parse("2026-06-05T12:00:00"));
        when(mentorReadRepositoryPort.findCurrentMentorByUserId(20L)).thenReturn(Optional.of(expected));

        CurrentMentorDetails actual = mentorQueryService.getCurrentMentor(20L);

        assertEquals(expected, actual);
    }

    @Test
    void getCurrentMentorThrowsWhenMentorProfileDoesNotExist() {
        when(mentorReadRepositoryPort.findCurrentMentorByUserId(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorQueryService.getCurrentMentor(99L));

        assertEquals("Mentor profile not found", exception.getMessage());
    }
}
