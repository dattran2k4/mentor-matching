package com.mentormatching.modules.mentor.infrastructure.persistence;

import java.util.List;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.mentor.application.port.out.MentorPersonalityRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorPersonality;
import com.mentormatching.modules.mentor.domain.MentorPersonalityRestoreData;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorPersonalityJpaRepository;

@Component
public class MentorPersonalityPersistenceAdapter implements MentorPersonalityRepositoryPort {

    private final MentorPersonalityJpaRepository mentorPersonalityJpaRepository;

    public MentorPersonalityPersistenceAdapter(MentorPersonalityJpaRepository mentorPersonalityJpaRepository) {
        this.mentorPersonalityJpaRepository = mentorPersonalityJpaRepository;
    }

    @Override
    public List<MentorPersonality> saveAll(List<MentorPersonality> mentorPersonalities) {
        return mentorPersonalityJpaRepository.saveAll(mentorPersonalities.stream()
                .map(mentorPersonality -> com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorPersonalityJpaEntity.builder()
                        .id(mentorPersonality.getId())
                        .mentorId(mentorPersonality.getMentorId())
                        .personalityOptionId(mentorPersonality.getPersonalityOptionId())
                        .createdAt(mentorPersonality.getCreatedAt())
                        .build())
                .toList()).stream()
                .map(entity -> MentorPersonality.restore(new MentorPersonalityRestoreData(entity.getId(),
                        entity.getMentorId(), entity.getPersonalityOptionId(), entity.getCreatedAt())))
                .toList();
    }

    @Override
    public List<MentorPersonality> findByMentorId(Long mentorId) {
        return mentorPersonalityJpaRepository.findByMentorId(mentorId).stream()
                .map(entity -> MentorPersonality.restore(new MentorPersonalityRestoreData(entity.getId(),
                        entity.getMentorId(), entity.getPersonalityOptionId(), entity.getCreatedAt())))
                .toList();
    }

    @Override
    public void deleteByMentorId(Long mentorId) {
        mentorPersonalityJpaRepository.deleteByMentorId(mentorId);
    }
}
