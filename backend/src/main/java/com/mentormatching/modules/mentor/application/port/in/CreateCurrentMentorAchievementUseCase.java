package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.CreateCurrentMentorAchievementCommand;
import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;

public interface CreateCurrentMentorAchievementUseCase {

    MentorAchievementDetail createCurrentMentorAchievement(CreateCurrentMentorAchievementCommand command);
}
