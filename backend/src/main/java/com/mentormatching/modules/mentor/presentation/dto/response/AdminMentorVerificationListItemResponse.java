package com.mentormatching.modules.mentor.presentation.dto.response;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationListItem;
import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;
import com.mentormatching.shared.response.PageResponse;

public record AdminMentorVerificationListItemResponse(Long id, Long mentorId, Long userId, String accountFullName,
                                                      String accountEmail,
                                                      MentorVerificationStatus verificationStatus,
                                                      LocalDateTime createdAt, LocalDateTime updatedAt) {

    public static AdminMentorVerificationListItemResponse from(AdminMentorVerificationListItem verification) {
        return new AdminMentorVerificationListItemResponse(verification.id(), verification.mentorId(),
                verification.userId(), verification.accountFullName(), verification.accountEmail(),
                verification.verificationStatus(), verification.createdAt(), verification.updatedAt());
    }

    public static PageResponse<AdminMentorVerificationListItemResponse> from(
            PageResponse<AdminMentorVerificationListItem> verifications) {
        return PageResponse.<AdminMentorVerificationListItemResponse>builder()
                .page(verifications.getPage())
                .pageSize(verifications.getPageSize())
                .totalPages(verifications.getTotalPages())
                .totalItems(verifications.getTotalItems())
                .data(verifications.getData().stream().map(AdminMentorVerificationListItemResponse::from).toList())
                .build();
    }
}
