package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.MentorDetail;

public interface GetMentorDetailUseCase {

    MentorDetail getMentorDetail(Long mentorId);
}
