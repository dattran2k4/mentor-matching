package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.MentorTraitsDetail;

public interface GetMentorTraitsUseCase {

    MentorTraitsDetail getMentorTraits(Long mentorId);
}
