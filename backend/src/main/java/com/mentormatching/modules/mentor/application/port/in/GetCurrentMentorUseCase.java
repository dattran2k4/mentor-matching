package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorDetails;

public interface GetCurrentMentorUseCase {

    CurrentMentorDetails getCurrentMentor(Long userId);
}
