package com.mentormatching.modules.mentor.application.port.out;

import java.util.Optional;

import com.mentormatching.modules.mentor.domain.MentorAchievement;

public interface MentorAchievementRepositoryPort {

    MentorAchievement save(MentorAchievement mentorAchievement);

    Optional<MentorAchievement> findById(Long id);

    void delete(MentorAchievement mentorAchievement);
}
