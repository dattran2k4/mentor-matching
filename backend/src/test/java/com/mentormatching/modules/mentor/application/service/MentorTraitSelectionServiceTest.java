package com.mentormatching.modules.mentor.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorTraitSelections;
import com.mentormatching.modules.mentor.application.dto.MentorOptionDetail;
import com.mentormatching.modules.mentor.application.dto.UpdateCurrentMentorTraitsCommand;
import com.mentormatching.modules.mentor.application.port.out.MentorHighlightRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorPersonalityRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorReadRepositoryPort;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.domain.MentorHighlight;
import com.mentormatching.modules.mentor.domain.MentorHighlightRestoreData;
import com.mentormatching.modules.mentor.domain.MentorPersonality;
import com.mentormatching.modules.mentor.domain.MentorPersonalityRestoreData;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorProfileRestoreData;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

class MentorTraitSelectionServiceTest {

    private MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private MentorPersonalityRepositoryPort mentorPersonalityRepositoryPort;
    private MentorHighlightRepositoryPort mentorHighlightRepositoryPort;
    private MentorReadRepositoryPort mentorReadRepositoryPort;
    private MentorTraitSelectionService mentorTraitSelectionService;

    @BeforeEach
    void setUp() {
        mentorProfileRepositoryPort = mock(MentorProfileRepositoryPort.class);
        mentorPersonalityRepositoryPort = mock(MentorPersonalityRepositoryPort.class);
        mentorHighlightRepositoryPort = mock(MentorHighlightRepositoryPort.class);
        mentorReadRepositoryPort = mock(MentorReadRepositoryPort.class);
        mentorTraitSelectionService = new MentorTraitSelectionService(mentorProfileRepositoryPort,
                mentorPersonalityRepositoryPort, mentorHighlightRepositoryPort, mentorReadRepositoryPort);
    }

    @Test
    void getCurrentMentorTraitsReturnsSelectedIds() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorPersonalityRepositoryPort.findByMentorId(10L)).thenReturn(List.of(
                MentorPersonality.restore(new MentorPersonalityRestoreData(1L, 10L, 3L,
                        LocalDateTime.parse("2026-06-01T10:00:00"))),
                MentorPersonality.restore(new MentorPersonalityRestoreData(2L, 10L, 1L,
                        LocalDateTime.parse("2026-06-01T10:00:00")))
        ));
        when(mentorHighlightRepositoryPort.findByMentorId(10L)).thenReturn(List.of(
                MentorHighlight.restore(new MentorHighlightRestoreData(1L, 10L, 5L,
                        LocalDateTime.parse("2026-06-01T10:00:00")))
        ));

        CurrentMentorTraitSelections actual = mentorTraitSelectionService.getCurrentMentorTraits(20L);

        assertEquals(List.of(1L, 3L), actual.personalityOptionIds());
        assertEquals(List.of(5L), actual.highlightOptionIds());
    }

    @Test
    void updateCurrentMentorTraitsReplacesSelections() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        UpdateCurrentMentorTraitsCommand command = new UpdateCurrentMentorTraitsCommand(20L,
                List.of(3L, 1L, 3L), List.of(7L, 5L, 7L));
        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorReadRepositoryPort.findPersonalityOptions()).thenReturn(List.of(
                new MentorOptionDetail(1L, "A", "A"),
                new MentorOptionDetail(3L, "B", "B")
        ));
        when(mentorReadRepositoryPort.findHighlightOptions()).thenReturn(List.of(
                new MentorOptionDetail(5L, "X", "X"),
                new MentorOptionDetail(7L, "Y", "Y")
        ));

        CurrentMentorTraitSelections actual = mentorTraitSelectionService.updateCurrentMentorTraits(command);

        verify(mentorPersonalityRepositoryPort).deleteByMentorId(10L);
        verify(mentorHighlightRepositoryPort).deleteByMentorId(10L);
        verify(mentorPersonalityRepositoryPort).saveAll(org.mockito.ArgumentMatchers.anyList());
        verify(mentorHighlightRepositoryPort).saveAll(org.mockito.ArgumentMatchers.anyList());
        assertEquals(List.of(1L, 3L), actual.personalityOptionIds());
        assertEquals(List.of(5L, 7L), actual.highlightOptionIds());
    }

    @Test
    void updateCurrentMentorTraitsThrowsWhenOptionIdIsInvalid() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        UpdateCurrentMentorTraitsCommand command = new UpdateCurrentMentorTraitsCommand(20L,
                List.of(999L), List.of());
        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorReadRepositoryPort.findPersonalityOptions()).thenReturn(List.of(
                new MentorOptionDetail(1L, "A", "A")
        ));

        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> mentorTraitSelectionService.updateCurrentMentorTraits(command));

        assertEquals("One or more personality options are invalid", exception.getMessage());
    }

    @Test
    void getCurrentMentorTraitsThrowsWhenMentorProfileDoesNotExist() {
        when(mentorProfileRepositoryPort.findByUserId(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorTraitSelectionService.getCurrentMentorTraits(99L));

        assertEquals("Mentor profile not found", exception.getMessage());
    }

    private MentorProfile mentorProfile(Long mentorId, Long userId) {
        return MentorProfile.restore(new MentorProfileRestoreData(mentorId, userId,
                "https://avatar.example.com/mentor.jpg", Gender.FEMALE, 1L, 2L, "Headline", "Intro",
                "Style", 5, "Teacher", "School", "University", "Math", MeetingType.HYBRID,
                MentorApprovalStatus.APPROVED, null, null, null, LocalDateTime.parse("2026-06-01T10:00:00"),
                LocalDateTime.parse("2026-06-02T10:00:00")));
    }
}
