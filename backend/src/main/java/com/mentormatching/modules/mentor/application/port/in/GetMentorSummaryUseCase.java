package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.MentorSummary;

public interface GetMentorSummaryUseCase {

    MentorSummary getMentorSummary(Long mentorId);
}
