package com.mentormatching.modules.mentor.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.mentor.application.port.out.MentorSubjectRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorSubject;
import com.mentormatching.modules.mentor.infrastructure.persistence.mapper.MentorSubjectPersistenceMapper;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorSubjectJpaRepository;

@Component
public class MentorSubjectPersistenceAdapter implements MentorSubjectRepositoryPort {

    private final MentorSubjectJpaRepository mentorSubjectJpaRepository;
    private final MentorSubjectPersistenceMapper mentorSubjectPersistenceMapper;

    public MentorSubjectPersistenceAdapter(MentorSubjectJpaRepository mentorSubjectJpaRepository,
                                           MentorSubjectPersistenceMapper mentorSubjectPersistenceMapper) {
        this.mentorSubjectJpaRepository = mentorSubjectJpaRepository;
        this.mentorSubjectPersistenceMapper = mentorSubjectPersistenceMapper;
    }

    @Override
    public MentorSubject save(MentorSubject mentorSubject) {
        return mentorSubjectPersistenceMapper.toDomain(mentorSubjectJpaRepository.save(
                mentorSubjectPersistenceMapper.toEntity(mentorSubject)));
    }

    @Override
    public Optional<MentorSubject> findById(Long id) {
        return mentorSubjectJpaRepository.findById(id).map(mentorSubjectPersistenceMapper::toDomain);
    }

    @Override
    public List<MentorSubject> findByMentorId(Long mentorId) {
        return mentorSubjectJpaRepository.findByMentorId(mentorId).stream()
                .map(mentorSubjectPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public List<MentorSubject> findBySubjectGradeId(Long subjectGradeId) {
        return mentorSubjectJpaRepository.findBySubjectGradeId(subjectGradeId).stream()
                .map(mentorSubjectPersistenceMapper::toDomain)
                .toList();
    }
}
