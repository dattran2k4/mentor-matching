package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorAchievementJpaEntity;

public interface MentorAchievementJpaRepository extends JpaRepository<MentorAchievementJpaEntity, Long> {

    List<MentorAchievementJpaEntity> findByMentorId(Long mentorId);

    List<MentorAchievementJpaEntity> findByMentorIdOrderByAchievedAtDescIdDesc(Long mentorId);
}
