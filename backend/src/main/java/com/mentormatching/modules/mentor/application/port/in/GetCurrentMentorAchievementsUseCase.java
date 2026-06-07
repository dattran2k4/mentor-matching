package com.mentormatching.modules.mentor.application.port.in;

import java.util.List;

import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;

public interface GetCurrentMentorAchievementsUseCase {

    List<MentorAchievementDetail> getCurrentMentorAchievements(Long userId);
}
