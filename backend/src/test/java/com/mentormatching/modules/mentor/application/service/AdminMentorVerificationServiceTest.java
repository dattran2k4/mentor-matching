package com.mentormatching.modules.mentor.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationDetail;
import com.mentormatching.modules.mentor.application.dto.ReviewMentorVerificationAction;
import com.mentormatching.modules.mentor.application.dto.ReviewMentorVerificationCommand;
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
import com.mentormatching.modules.user.application.port.out.UserReadPort;
import com.mentormatching.modules.user.application.port.out.UserRepositoryPort;
import com.mentormatching.modules.user.domain.User;
import com.mentormatching.modules.user.domain.UserRestoreData;
import com.mentormatching.modules.user.domain.UserRole;
import com.mentormatching.modules.user.domain.UserStatus;
import com.mentormatching.modules.user.domain.UserType;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

class AdminMentorVerificationServiceTest {

    private MentorVerificationRepositoryPort mentorVerificationRepositoryPort;
    private MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private MentorReadRepositoryPort mentorReadRepositoryPort;
    private UserReadPort userReadPort;
    private UserRepositoryPort userRepositoryPort;
    private AdminMentorVerificationService adminMentorVerificationService;

    @BeforeEach
    void setUp() {
        mentorVerificationRepositoryPort = mock(MentorVerificationRepositoryPort.class);
        mentorProfileRepositoryPort = mock(MentorProfileRepositoryPort.class);
        mentorReadRepositoryPort = mock(MentorReadRepositoryPort.class);
        userReadPort = mock(UserReadPort.class);
        userRepositoryPort = mock(UserRepositoryPort.class);
        adminMentorVerificationService = new AdminMentorVerificationService(mentorVerificationRepositoryPort,
                mentorProfileRepositoryPort, mentorReadRepositoryPort, userReadPort, userRepositoryPort);
    }

    @Test
    void reviewMentorVerificationVerifiesPendingVerificationAndPromotesUserRole() {
        ReviewMentorVerificationCommand command = new ReviewMentorVerificationCommand(99L, 30L,
                ReviewMentorVerificationAction.VERIFY, null);
        MentorVerification verification = pendingVerification();
        MentorProfile mentorProfile = mentorProfile();
        User learnerUser = learnerUser();
        AdminMentorVerificationDetail expected = verifiedDetail();

        when(mentorVerificationRepositoryPort.findById(30L)).thenReturn(Optional.of(verification));
        when(mentorProfileRepositoryPort.findById(10L)).thenReturn(Optional.of(mentorProfile));
        when(userReadPort.findById(20L)).thenReturn(Optional.of(learnerUser));
        when(mentorVerificationRepositoryPort.save(verification)).thenReturn(verification);
        when(userRepositoryPort.save(learnerUser)).thenReturn(learnerUser);
        when(mentorReadRepositoryPort.findAdminMentorVerificationDetailById(30L)).thenReturn(Optional.of(expected));

        AdminMentorVerificationDetail actual = adminMentorVerificationService.reviewMentorVerification(command);

        assertSame(expected, actual);
        assertEquals(MentorVerificationStatus.VERIFIED, verification.getVerificationStatus());
        assertEquals(99L, verification.getVerifiedBy());
        assertEquals(UserRole.MENTOR, learnerUser.getRole());
        verify(userRepositoryPort).save(learnerUser);
        verify(mentorVerificationRepositoryPort).save(verification);
    }

    @Test
    void reviewMentorVerificationRejectsPendingVerification() {
        ReviewMentorVerificationCommand command = new ReviewMentorVerificationCommand(99L, 30L,
                ReviewMentorVerificationAction.REJECT, "  Missing selfie with ID  ");
        MentorVerification verification = pendingVerification();
        MentorProfile mentorProfile = mentorProfile();
        AdminMentorVerificationDetail expected = rejectedDetail();

        when(mentorVerificationRepositoryPort.findById(30L)).thenReturn(Optional.of(verification));
        when(mentorProfileRepositoryPort.findById(10L)).thenReturn(Optional.of(mentorProfile));
        when(mentorVerificationRepositoryPort.save(verification)).thenReturn(verification);
        when(mentorReadRepositoryPort.findAdminMentorVerificationDetailById(30L)).thenReturn(Optional.of(expected));

        AdminMentorVerificationDetail actual = adminMentorVerificationService.reviewMentorVerification(command);

        assertSame(expected, actual);
        assertEquals(MentorVerificationStatus.REJECTED, verification.getVerificationStatus());
        assertEquals("Missing selfie with ID", verification.getRejectionReason());
        verify(userRepositoryPort, never()).save(org.mockito.ArgumentMatchers.any(User.class));
        verify(mentorVerificationRepositoryPort).save(verification);
    }

    @Test
    void reviewMentorVerificationThrowsWhenRejectionReasonIsMissing() {
        ReviewMentorVerificationCommand command = new ReviewMentorVerificationCommand(99L, 30L,
                ReviewMentorVerificationAction.REJECT, "   ");
        MentorVerification verification = pendingVerification();
        MentorProfile mentorProfile = mentorProfile();

        when(mentorVerificationRepositoryPort.findById(30L)).thenReturn(Optional.of(verification));
        when(mentorProfileRepositoryPort.findById(10L)).thenReturn(Optional.of(mentorProfile));

        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> adminMentorVerificationService.reviewMentorVerification(command));

        assertEquals("Rejection reason is required when rejecting verification", exception.getMessage());
        verify(mentorVerificationRepositoryPort, never()).save(org.mockito.ArgumentMatchers.any(MentorVerification.class));
        verify(userRepositoryPort, never()).save(org.mockito.ArgumentMatchers.any(User.class));
    }

    @Test
    void reviewMentorVerificationThrowsWhenVerificationIsNotPending() {
        ReviewMentorVerificationCommand command = new ReviewMentorVerificationCommand(99L, 30L,
                ReviewMentorVerificationAction.VERIFY, null);
        MentorVerification verification = verifiedVerification();
        MentorProfile mentorProfile = mentorProfile();

        when(mentorVerificationRepositoryPort.findById(30L)).thenReturn(Optional.of(verification));
        when(mentorProfileRepositoryPort.findById(10L)).thenReturn(Optional.of(mentorProfile));

        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> adminMentorVerificationService.reviewMentorVerification(command));

        assertEquals("Only pending verification can be reviewed", exception.getMessage());
    }

    @Test
    void reviewMentorVerificationThrowsWhenVerificationDoesNotExist() {
        ReviewMentorVerificationCommand command = new ReviewMentorVerificationCommand(99L, 30L,
                ReviewMentorVerificationAction.VERIFY, null);

        when(mentorVerificationRepositoryPort.findById(30L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> adminMentorVerificationService.reviewMentorVerification(command));

        assertEquals("Mentor verification not found", exception.getMessage());
    }

    private MentorVerification pendingVerification() {
        return MentorVerification.restore(new MentorVerificationRestoreData(30L, 10L, "Nguyen Minh Anh",
                "012345678901", "https://cdn.example.com/front.jpg", "https://cdn.example.com/back.jpg",
                "https://cdn.example.com/selfie.jpg", MentorVerificationStatus.PENDING, null, null, null,
                LocalDateTime.parse("2026-06-03T10:00:00"), LocalDateTime.parse("2026-06-04T10:00:00")));
    }

    private MentorVerification verifiedVerification() {
        return MentorVerification.restore(new MentorVerificationRestoreData(30L, 10L, "Nguyen Minh Anh",
                "012345678901", "https://cdn.example.com/front.jpg", "https://cdn.example.com/back.jpg",
                "https://cdn.example.com/selfie.jpg", MentorVerificationStatus.VERIFIED, 99L,
                LocalDateTime.parse("2026-06-05T10:00:00"), null, LocalDateTime.parse("2026-06-03T10:00:00"),
                LocalDateTime.parse("2026-06-05T10:00:00")));
    }

    private MentorProfile mentorProfile() {
        return MentorProfile.restore(new MentorProfileRestoreData(10L, 20L, "https://avatar.example.com/mentor.jpg",
                Gender.FEMALE, 1L, 2L, "Headline", "Intro", "Style", 5, "Teacher", "School", "University", "Math",
                MeetingType.HYBRID, MentorApprovalStatus.PENDING, null, null, null,
                LocalDateTime.parse("2026-06-01T10:00:00"), LocalDateTime.parse("2026-06-02T10:00:00")));
    }

    private User learnerUser() {
        return User.restore(new UserRestoreData(20L, "Nguyen Minh Anh", "mentor@example.com", "encoded-password",
                "0900000002", UserRole.LEARNER, UserType.STUDENT, UserStatus.ACTIVE,
                LocalDateTime.parse("2026-05-01T10:00:00"), LocalDateTime.parse("2026-05-02T10:00:00")));
    }

    private AdminMentorVerificationDetail verifiedDetail() {
        return new AdminMentorVerificationDetail(30L, 10L, 20L, "Nguyen Minh Anh", "mentor@example.com",
                "0900000002", MentorApprovalStatus.PENDING, null, "Nguyen Minh Anh", "012345678901",
                "https://cdn.example.com/front.jpg", "https://cdn.example.com/back.jpg",
                "https://cdn.example.com/selfie.jpg", MentorVerificationStatus.VERIFIED, 99L,
                LocalDateTime.parse("2026-06-05T10:00:00"), null, LocalDateTime.parse("2026-06-03T10:00:00"),
                LocalDateTime.parse("2026-06-05T10:00:00"));
    }

    private AdminMentorVerificationDetail rejectedDetail() {
        return new AdminMentorVerificationDetail(30L, 10L, 20L, "Nguyen Minh Anh", "mentor@example.com",
                "0900000002", MentorApprovalStatus.PENDING, null, "Nguyen Minh Anh", "012345678901",
                "https://cdn.example.com/front.jpg", "https://cdn.example.com/back.jpg",
                "https://cdn.example.com/selfie.jpg", MentorVerificationStatus.REJECTED, null, null,
                "Missing selfie with ID", LocalDateTime.parse("2026-06-03T10:00:00"),
                LocalDateTime.parse("2026-06-05T10:00:00"));
    }
}
