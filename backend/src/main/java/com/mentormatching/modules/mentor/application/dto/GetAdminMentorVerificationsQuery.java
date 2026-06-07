package com.mentormatching.modules.mentor.application.dto;

import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;

public record GetAdminMentorVerificationsQuery(int page, int size, String sortBy, String sortDir,
                                               MentorVerificationStatus status) {
}
