package com.mentormatching.modules.mentor.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationDetail;
import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationListItem;
import com.mentormatching.modules.mentor.application.dto.CurrentMentorVerificationDetails;
import com.mentormatching.modules.mentor.application.dto.GetAdminMentorVerificationsQuery;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorReadRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorVerificationRepositoryPort;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorProfileRestoreData;
import com.mentormatching.modules.mentor.domain.MentorVerification;
import com.mentormatching.modules.mentor.domain.MentorVerificationRestoreData;
import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;
import com.mentormatching.shared.exception.ResourceNotFoundException;
import com.mentormatching.shared.response.PageResponse;

class MentorVerificationQueryServiceTest {

    private MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private MentorReadRepositoryPort mentorReadRepositoryPort;
    private MentorVerificationRepositoryPort mentorVerificationRepositoryPort;
    private MentorVerificationQueryService mentorVerificationQueryService;

    @BeforeEach
    void setUp() {
        mentorProfileRepositoryPort = mock(MentorProfileRepositoryPort.class);
        mentorReadRepositoryPort = mock(MentorReadRepositoryPort.class);
        mentorVerificationRepositoryPort = mock(MentorVerificationRepositoryPort.class);
        mentorVerificationQueryService = new MentorVerificationQueryService(mentorProfileRepositoryPort,
                mentorReadRepositoryPort,
                mentorVerificationRepositoryPort);
    }

    @Test
    void getCurrentMentorVerificationReturnsVerificationDetails() {
        MentorProfile mentorProfile = MentorProfile.restore(new MentorProfileRestoreData(10L, 20L,
                "https://avatar.example.com/mentor.jpg", Gender.FEMALE, 1L, 2L, "Headline", "Intro",
                "Style", 5, "Teacher", "School", "University", "Math", MeetingType.HYBRID,
                MentorApprovalStatus.APPROVED, null, null, null, LocalDateTime.parse("2026-06-01T10:00:00"),
                LocalDateTime.parse("2026-06-02T10:00:00")));
        MentorVerification verification = MentorVerification.restore(new MentorVerificationRestoreData(30L, 10L,
                "Nguyen Minh Anh", "012345678901", "https://cdn.example.com/front.jpg",
                "https://cdn.example.com/back.jpg", "https://cdn.example.com/selfie.jpg",
                MentorVerificationStatus.PENDING, null, null, null, LocalDateTime.parse("2026-06-03T10:00:00"),
                LocalDateTime.parse("2026-06-04T10:00:00")));

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorVerificationRepositoryPort.findByMentorId(10L)).thenReturn(Optional.of(verification));

        CurrentMentorVerificationDetails actual = mentorVerificationQueryService.getCurrentMentorVerification(20L);

        assertEquals(30L, actual.id());
        assertEquals(10L, actual.mentorId());
        assertEquals("Nguyen Minh Anh", actual.fullName());
        assertEquals("012345678901", actual.idCardNumber());
        assertEquals("https://cdn.example.com/front.jpg", actual.idCardFrontUrl());
        assertEquals("https://cdn.example.com/back.jpg", actual.idCardBackUrl());
        assertEquals("https://cdn.example.com/selfie.jpg", actual.selfieWithIdUrl());
        assertEquals("PENDING", actual.verificationStatus());
    }

    @Test
    void getCurrentMentorVerificationReturnsUnverifiedWhenVerificationDoesNotExist() {
        MentorProfile mentorProfile = MentorProfile.restore(new MentorProfileRestoreData(10L, 20L,
                "https://avatar.example.com/mentor.jpg", Gender.FEMALE, 1L, 2L, "Headline", "Intro",
                "Style", 5, "Teacher", "School", "University", "Math", MeetingType.HYBRID,
                MentorApprovalStatus.APPROVED, null, null, null, LocalDateTime.parse("2026-06-01T10:00:00"),
                LocalDateTime.parse("2026-06-02T10:00:00")));

        when(mentorProfileRepositoryPort.findByUserId(20L)).thenReturn(Optional.of(mentorProfile));
        when(mentorVerificationRepositoryPort.findByMentorId(10L)).thenReturn(Optional.empty());

        CurrentMentorVerificationDetails actual = mentorVerificationQueryService.getCurrentMentorVerification(20L);

        assertNull(actual.id());
        assertEquals(10L, actual.mentorId());
        assertEquals("UNVERIFIED", actual.verificationStatus());
        assertNull(actual.fullName());
        assertNull(actual.idCardFrontUrl());
    }

    @Test
    void getCurrentMentorVerificationThrowsWhenMentorProfileDoesNotExist() {
        when(mentorProfileRepositoryPort.findByUserId(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorVerificationQueryService.getCurrentMentorVerification(99L));

        assertEquals("Mentor profile not found", exception.getMessage());
    }

    @Test
    void getAdminMentorVerificationsReturnsReadRepositoryResult() {
        GetAdminMentorVerificationsQuery query = new GetAdminMentorVerificationsQuery(1, 10, "createdAt", "desc",
                MentorVerificationStatus.PENDING);
        PageResponse<AdminMentorVerificationListItem> expected = PageResponse.<AdminMentorVerificationListItem>builder()
                .page(1)
                .pageSize(10)
                .totalPages(1)
                .totalItems(1)
                .data(List.of(new AdminMentorVerificationListItem(30L, 10L, 20L, "Nguyen Minh Anh",
                        "mentor@example.com", MentorVerificationStatus.PENDING,
                        LocalDateTime.parse("2026-06-03T10:00:00"), LocalDateTime.parse("2026-06-04T10:00:00"))))
                .build();

        when(mentorReadRepositoryPort.findAdminMentorVerifications(query)).thenReturn(expected);

        PageResponse<AdminMentorVerificationListItem> actual = mentorVerificationQueryService
                .getAdminMentorVerifications(query);

        assertEquals(expected, actual);
    }

    @Test
    void getAdminMentorVerificationDetailReturnsReadRepositoryResult() {
        AdminMentorVerificationDetail expected = new AdminMentorVerificationDetail(30L, 10L, 20L, "Nguyen Minh Anh",
                "mentor@example.com", "0900000002", MentorApprovalStatus.PENDING, null, "Nguyen Minh Anh",
                "012345678901", "https://cdn.example.com/front.jpg", "https://cdn.example.com/back.jpg",
                "https://cdn.example.com/selfie.jpg", MentorVerificationStatus.PENDING, null, null, null,
                LocalDateTime.parse("2026-06-03T10:00:00"), LocalDateTime.parse("2026-06-04T10:00:00"));
        when(mentorReadRepositoryPort.findAdminMentorVerificationDetailById(30L)).thenReturn(Optional.of(expected));

        AdminMentorVerificationDetail actual = mentorVerificationQueryService.getAdminMentorVerificationDetail(30L);

        assertEquals(expected, actual);
    }

    @Test
    void getAdminMentorVerificationDetailThrowsWhenVerificationDoesNotExist() {
        when(mentorReadRepositoryPort.findAdminMentorVerificationDetailById(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorVerificationQueryService.getAdminMentorVerificationDetail(99L));

        assertEquals("Mentor verification not found", exception.getMessage());
    }
}
