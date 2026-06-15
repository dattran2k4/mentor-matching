package com.mentormatching.modules.mentor.application.dto;

import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;

public record MentorSummary(Long mentorId, Long userId, MeetingType meetingType,
                            MentorApprovalStatus approvalStatus) {
}
