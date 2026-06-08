package com.mentormatching.modules.mentor.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.catalog.application.dto.SubjectGradeSummary;
import com.mentormatching.modules.mentor.application.dto.MentorSubjectDetail;
import com.mentormatching.modules.mentor.application.dto.UpsertCurrentMentorSubjectCommand;
import com.mentormatching.modules.mentor.application.port.out.MentorCatalogLookupPort;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorSubjectRepositoryPort;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorProfileRestoreData;
import com.mentormatching.modules.mentor.domain.MentorSubject;
import com.mentormatching.modules.mentor.domain.MentorSubjectRestoreData;
import com.mentormatching.modules.mentor.domain.ProficiencyLevel;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

class MentorSubjectServiceTest {

    private MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private MentorSubjectRepositoryPort mentorSubjectRepositoryPort;
    private MentorCatalogLookupPort mentorCatalogLookupPort;
    private MentorSubjectService mentorSubjectService;

    @BeforeEach
    void setUp() {
        mentorProfileRepositoryPort = mock(MentorProfileRepositoryPort.class);
        mentorSubjectRepositoryPort = mock(MentorSubjectRepositoryPort.class);
        mentorCatalogLookupPort = mock(MentorCatalogLookupPort.class);
        mentorSubjectService = new MentorSubjectService(mentorProfileRepositoryPort, mentorSubjectRepositoryPort,
                mentorCatalogLookupPort);
    }

    @Test
    void upsertCurrentMentorSubjectCreatesSubjectWhenIdIsNull() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        UpsertCurrentMentorSubjectCommand command = new UpsertCurrentMentorSubjectCommand(20L, null, 200L,
                ProficiencyLevel.EXPERT, "Teaching note", new BigDecimal("250000"), true);
        SubjectGradeSummary subjectGradeSummary = new SubjectGradeSummary(200L, 300L, "Toan", 400L, "Lop 9");
        MentorSubject saved = MentorSubject.restore(new MentorSubjectRestoreData(100L, 10L, 200L,
                ProficiencyLevel.EXPERT, "Teaching note", new BigDecimal("250000"), true,
                LocalDateTime.parse("2026-06-01T10:00:00"), LocalDateTime.parse("2026-06-01T10:00:00")));

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorCatalogLookupPort.getSubjectGradeSummary(200L)).thenReturn(subjectGradeSummary);
        when(mentorSubjectRepositoryPort.findByMentorId(10L)).thenReturn(List.of());
        when(mentorSubjectRepositoryPort.save(org.mockito.ArgumentMatchers.any(MentorSubject.class))).thenReturn(saved);

        MentorSubjectDetail actual = mentorSubjectService.upsertCurrentMentorSubject(command);

        assertEquals(100L, actual.id());
        assertEquals(300L, actual.subjectId());
        assertEquals("Toan", actual.subjectName());
        assertEquals(400L, actual.gradeId());
        assertEquals("Lop 9", actual.gradeName());
        assertEquals(true, actual.active());
    }

    @Test
    void upsertCurrentMentorSubjectUpdatesExistingSubjectWhenIdIsPresent() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        MentorSubject existing = MentorSubject.restore(new MentorSubjectRestoreData(100L, 10L, 200L,
                ProficiencyLevel.BASIC, "Old", new BigDecimal("200000"), false,
                LocalDateTime.parse("2026-06-01T10:00:00"), LocalDateTime.parse("2026-06-01T10:00:00")));
        UpsertCurrentMentorSubjectCommand command = new UpsertCurrentMentorSubjectCommand(20L, 100L, 201L,
                ProficiencyLevel.ADVANCED, "New note", new BigDecimal("300000"), true);
        SubjectGradeSummary subjectGradeSummary = new SubjectGradeSummary(201L, 301L, "Vat ly", 401L, "Lop 10");

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorCatalogLookupPort.getSubjectGradeSummary(201L)).thenReturn(subjectGradeSummary);
        when(mentorSubjectRepositoryPort.findByMentorId(10L)).thenReturn(List.of(existing));
        when(mentorSubjectRepositoryPort.save(existing)).thenReturn(existing);

        MentorSubjectDetail actual = mentorSubjectService.upsertCurrentMentorSubject(command);

        assertEquals(100L, actual.id());
        assertEquals(301L, actual.subjectId());
        assertEquals("Vat ly", actual.subjectName());
        assertEquals(ProficiencyLevel.ADVANCED, actual.proficiencyLevel());
        assertEquals(new BigDecimal("300000"), actual.pricePerHour());
        assertEquals(true, actual.active());
    }

    @Test
    void upsertCurrentMentorSubjectThrowsWhenSubjectGradeIsDuplicated() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        MentorSubject existing = MentorSubject.restore(new MentorSubjectRestoreData(100L, 10L, 200L,
                ProficiencyLevel.BASIC, "Old", new BigDecimal("200000"), false,
                LocalDateTime.parse("2026-06-01T10:00:00"), LocalDateTime.parse("2026-06-01T10:00:00")));
        UpsertCurrentMentorSubjectCommand command = new UpsertCurrentMentorSubjectCommand(20L, null, 200L,
                ProficiencyLevel.ADVANCED, "New note", new BigDecimal("300000"), true);
        SubjectGradeSummary subjectGradeSummary = new SubjectGradeSummary(200L, 300L, "Toan", 400L, "Lop 9");

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorCatalogLookupPort.getSubjectGradeSummary(200L)).thenReturn(subjectGradeSummary);
        when(mentorSubjectRepositoryPort.findByMentorId(10L)).thenReturn(List.of(existing));

        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> mentorSubjectService.upsertCurrentMentorSubject(command));

        assertEquals("Mentor subject already exists for this subject grade", exception.getMessage());
    }

    @Test
    void upsertCurrentMentorSubjectThrowsWhenSubjectDoesNotBelongToMentor() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        UpsertCurrentMentorSubjectCommand command = new UpsertCurrentMentorSubjectCommand(20L, 999L, 201L,
                ProficiencyLevel.ADVANCED, "New note", new BigDecimal("300000"), true);
        SubjectGradeSummary subjectGradeSummary = new SubjectGradeSummary(201L, 301L, "Vat ly", 401L, "Lop 10");

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorCatalogLookupPort.getSubjectGradeSummary(201L)).thenReturn(subjectGradeSummary);
        when(mentorSubjectRepositoryPort.findByMentorId(10L)).thenReturn(List.of());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorSubjectService.upsertCurrentMentorSubject(command));

        assertEquals("Mentor subject not found", exception.getMessage());
    }

    @Test
    void deleteCurrentMentorSubjectDeletesSubjectWhenItBelongsToCurrentMentor() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        MentorSubject existing = MentorSubject.restore(new MentorSubjectRestoreData(100L, 10L, 200L,
                ProficiencyLevel.BASIC, "Old", new BigDecimal("200000"), false,
                LocalDateTime.parse("2026-06-01T10:00:00"), LocalDateTime.parse("2026-06-01T10:00:00")));

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorSubjectRepositoryPort.findById(100L)).thenReturn(Optional.of(existing));

        mentorSubjectService.deleteCurrentMentorSubject(20L, 100L);

        verify(mentorSubjectRepositoryPort).delete(existing);
    }

    @Test
    void deleteCurrentMentorSubjectThrowsWhenSubjectDoesNotBelongToCurrentMentor() {
        MentorProfile mentorProfile = mentorProfile(10L, 20L);
        MentorSubject existing = MentorSubject.restore(new MentorSubjectRestoreData(100L, 99L, 200L,
                ProficiencyLevel.BASIC, "Old", new BigDecimal("200000"), false,
                LocalDateTime.parse("2026-06-01T10:00:00"), LocalDateTime.parse("2026-06-01T10:00:00")));

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorSubjectRepositoryPort.findById(100L)).thenReturn(Optional.of(existing));

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorSubjectService.deleteCurrentMentorSubject(20L, 100L));

        assertEquals("Mentor subject not found", exception.getMessage());
    }

    @Test
    void deleteCurrentMentorSubjectThrowsWhenMentorProfileDoesNotExist() {
        when(mentorProfileRepositoryPort.findByUserId(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorSubjectService.deleteCurrentMentorSubject(99L, 100L));

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
