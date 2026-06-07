package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorTraitSelections;

public interface GetCurrentMentorTraitsUseCase {

    CurrentMentorTraitSelections getCurrentMentorTraits(Long userId);
}
