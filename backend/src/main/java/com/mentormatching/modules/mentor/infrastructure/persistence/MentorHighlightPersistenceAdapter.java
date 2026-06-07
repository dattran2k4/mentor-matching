package com.mentormatching.modules.mentor.infrastructure.persistence;

import java.util.List;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.mentor.application.port.out.MentorHighlightRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorHighlight;
import com.mentormatching.modules.mentor.domain.MentorHighlightRestoreData;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorHighlightJpaRepository;

@Component
public class MentorHighlightPersistenceAdapter implements MentorHighlightRepositoryPort {

    private final MentorHighlightJpaRepository mentorHighlightJpaRepository;

    public MentorHighlightPersistenceAdapter(MentorHighlightJpaRepository mentorHighlightJpaRepository) {
        this.mentorHighlightJpaRepository = mentorHighlightJpaRepository;
    }

    @Override
    public List<MentorHighlight> saveAll(List<MentorHighlight> mentorHighlights) {
        return mentorHighlightJpaRepository.saveAll(mentorHighlights.stream()
                .map(mentorHighlight -> com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorHighlightJpaEntity.builder()
                        .id(mentorHighlight.getId())
                        .mentorId(mentorHighlight.getMentorId())
                        .highlightOptionId(mentorHighlight.getHighlightOptionId())
                        .createdAt(mentorHighlight.getCreatedAt())
                        .build())
                .toList()).stream()
                .map(entity -> MentorHighlight.restore(new MentorHighlightRestoreData(entity.getId(),
                        entity.getMentorId(), entity.getHighlightOptionId(), entity.getCreatedAt())))
                .toList();
    }

    @Override
    public List<MentorHighlight> findByMentorId(Long mentorId) {
        return mentorHighlightJpaRepository.findByMentorId(mentorId).stream()
                .map(entity -> MentorHighlight.restore(new MentorHighlightRestoreData(entity.getId(),
                        entity.getMentorId(), entity.getHighlightOptionId(), entity.getCreatedAt())))
                .toList();
    }

    @Override
    public void deleteByMentorId(Long mentorId) {
        mentorHighlightJpaRepository.deleteByMentorId(mentorId);
    }
}
