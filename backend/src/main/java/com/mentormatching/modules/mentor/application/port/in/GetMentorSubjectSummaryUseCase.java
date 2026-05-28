package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.MentorSubjectSummary;

public interface GetMentorSubjectSummaryUseCase {

    MentorSubjectSummary getMentorSubjectSummary(Long mentorSubjectId);
}
