package com.mentormatching.modules.mentor.infrastructure.persistence;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.mentor.application.port.out.MentorAchievementRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorAchievement;
import com.mentormatching.modules.mentor.infrastructure.persistence.mapper.MentorAchievementPersistenceMapper;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorAchievementJpaRepository;

@Component
@RequiredArgsConstructor
public class MentorAchievementPersistenceAdapter implements MentorAchievementRepositoryPort {

    private final MentorAchievementJpaRepository mentorAchievementJpaRepository;
    private final MentorAchievementPersistenceMapper mentorAchievementPersistenceMapper;

    @Override
    public MentorAchievement save(MentorAchievement mentorAchievement) {
        return mentorAchievementPersistenceMapper.toDomain(mentorAchievementJpaRepository.save(
                mentorAchievementPersistenceMapper.toEntity(mentorAchievement)));
    }

    @Override
    public Optional<MentorAchievement> findById(Long id) {
        return mentorAchievementJpaRepository.findById(id).map(mentorAchievementPersistenceMapper::toDomain);
    }

    @Override
    public void delete(MentorAchievement mentorAchievement) {
        mentorAchievementJpaRepository.delete(mentorAchievementPersistenceMapper.toEntity(mentorAchievement));
    }
}
