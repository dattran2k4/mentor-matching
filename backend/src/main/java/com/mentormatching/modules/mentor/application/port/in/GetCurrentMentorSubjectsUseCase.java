package com.mentormatching.modules.mentor.application.port.in;

import java.util.List;

import com.mentormatching.modules.mentor.application.dto.MentorSubjectDetail;

public interface GetCurrentMentorSubjectsUseCase {

    List<MentorSubjectDetail> getCurrentMentorSubjects(Long userId);
}
