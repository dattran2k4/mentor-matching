package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.MentorSummary;

public interface GetMentorSummaryByUserUseCase {

    MentorSummary getMentorSummaryByUserId(Long userId);
}
