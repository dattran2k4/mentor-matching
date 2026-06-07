package com.mentormatching.modules.mentor.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.mentor.application.dto.CreateCurrentMentorAchievementCommand;
import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;
import com.mentormatching.modules.mentor.application.dto.UpdateCurrentMentorAchievementCommand;
import com.mentormatching.modules.mentor.application.port.out.MentorAchievementRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.domain.AchievementType;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorAchievement;
import com.mentormatching.modules.mentor.domain.MentorAchievementRestoreData;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorProfileRestoreData;
import com.mentormatching.shared.exception.ResourceNotFoundException;

class MentorAchievementServiceTest {

    private MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private MentorAchievementRepositoryPort mentorAchievementRepositoryPort;
    private MentorAchievementService mentorAchievementService;

    @BeforeEach
    void setUp() {
        mentorProfileRepositoryPort = mock(MentorProfileRepositoryPort.class);
        mentorAchievementRepositoryPort = mock(MentorAchievementRepositoryPort.class);
        mentorAchievementService = new MentorAchievementService(mentorProfileRepositoryPort,
                mentorAchievementRepositoryPort);
    }

    @Test
    void createCurrentMentorAchievementCreatesAchievementForCurrentMentor() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        CreateCurrentMentorAchievementCommand command = new CreateCurrentMentorAchievementCommand(20L, "Giai nhat",
                "Dat giai cap thanh pho", AchievementType.AWARD, "So Giao duc",
                LocalDate.parse("2024-05-10"), "https://example.com/proof.jpg");
        MentorAchievement saved = MentorAchievement.restore(new MentorAchievementRestoreData(100L, 10L, "Giai nhat",
                "Dat giai cap thanh pho", AchievementType.AWARD, "So Giao duc", LocalDate.parse("2024-05-10"),
                "https://example.com/proof.jpg", false, null, null,
                LocalDateTime.parse("2026-06-07T10:00:00"), LocalDateTime.parse("2026-06-07T10:00:00")));

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorAchievementRepositoryPort.save(org.mockito.ArgumentMatchers.any(MentorAchievement.class)))
                .thenReturn(saved);

        MentorAchievementDetail actual = mentorAchievementService.createCurrentMentorAchievement(command);

        assertEquals(100L, actual.id());
        assertEquals("Giai nhat", actual.title());
        assertEquals(AchievementType.AWARD, actual.achievementType());
        assertFalse(actual.verified());
    }

    @Test
    void updateCurrentMentorAchievementResetsVerificationWhenAchievementBelongsToCurrentMentor() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        MentorAchievement existing = MentorAchievement.restore(new MentorAchievementRestoreData(100L, 10L, "Cu",
                "Mo ta cu", AchievementType.CERTIFICATE, "Coursera", LocalDate.parse("2023-10-01"),
                "https://example.com/old.jpg", true, 50L, LocalDateTime.parse("2026-06-06T10:00:00"),
                LocalDateTime.parse("2026-06-01T10:00:00"), LocalDateTime.parse("2026-06-06T10:00:00")));
        UpdateCurrentMentorAchievementCommand command = new UpdateCurrentMentorAchievementCommand(20L, 100L,
                "Moi", "Mo ta moi", AchievementType.PROJECT, "OpenAI", LocalDate.parse("2024-01-15"),
                "https://example.com/new.jpg");

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorAchievementRepositoryPort.findById(100L)).thenReturn(Optional.of(existing));
        when(mentorAchievementRepositoryPort.save(existing)).thenReturn(existing);

        MentorAchievementDetail actual = mentorAchievementService.updateCurrentMentorAchievement(command);

        assertEquals(100L, actual.id());
        assertEquals("Moi", actual.title());
        assertEquals(AchievementType.PROJECT, actual.achievementType());
        assertFalse(actual.verified());
        assertNull(existing.getVerifiedBy());
        assertNull(existing.getVerifiedAt());
    }

    @Test
    void updateCurrentMentorAchievementThrowsWhenAchievementDoesNotBelongToCurrentMentor() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        MentorAchievement existing = MentorAchievement.restore(new MentorAchievementRestoreData(100L, 99L, "Cu",
                "Mo ta cu", AchievementType.CERTIFICATE, "Coursera", LocalDate.parse("2023-10-01"),
                "https://example.com/old.jpg", true, 50L, LocalDateTime.parse("2026-06-06T10:00:00"),
                LocalDateTime.parse("2026-06-01T10:00:00"), LocalDateTime.parse("2026-06-06T10:00:00")));
        UpdateCurrentMentorAchievementCommand command = new UpdateCurrentMentorAchievementCommand(20L, 100L,
                "Moi", "Mo ta moi", AchievementType.PROJECT, "OpenAI", LocalDate.parse("2024-01-15"),
                "https://example.com/new.jpg");

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorAchievementRepositoryPort.findById(100L)).thenReturn(Optional.of(existing));

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorAchievementService.updateCurrentMentorAchievement(command));

        assertEquals("Mentor achievement not found", exception.getMessage());
    }

    @Test
    void deleteCurrentMentorAchievementDeletesAchievementWhenItBelongsToCurrentMentor() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        MentorAchievement existing = MentorAchievement.restore(new MentorAchievementRestoreData(100L, 10L, "Cu",
                "Mo ta cu", AchievementType.CERTIFICATE, "Coursera", LocalDate.parse("2023-10-01"),
                "https://example.com/old.jpg", false, null, null,
                LocalDateTime.parse("2026-06-01T10:00:00"), LocalDateTime.parse("2026-06-06T10:00:00")));

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorAchievementRepositoryPort.findById(100L)).thenReturn(Optional.of(existing));

        mentorAchievementService.deleteCurrentMentorAchievement(20L, 100L);

        verify(mentorAchievementRepositoryPort).delete(existing);
    }

    @Test
    void deleteCurrentMentorAchievementThrowsWhenMentorProfileDoesNotExist() {
        when(mentorProfileRepositoryPort.findByUserId(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorAchievementService.deleteCurrentMentorAchievement(99L, 100L));

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
