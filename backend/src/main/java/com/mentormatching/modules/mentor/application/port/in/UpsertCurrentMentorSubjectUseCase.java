package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.MentorSubjectDetail;
import com.mentormatching.modules.mentor.application.dto.UpsertCurrentMentorSubjectCommand;

public interface UpsertCurrentMentorSubjectUseCase {

    MentorSubjectDetail upsertCurrentMentorSubject(UpsertCurrentMentorSubjectCommand command);
}
