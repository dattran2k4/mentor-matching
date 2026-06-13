package com.mentormatching.modules.scheduling.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.scheduling.application.port.out.MentorAvailabilityRepositoryPort;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.modules.scheduling.domain.MentorAvailability;
import com.mentormatching.modules.scheduling.infrastructure.persistence.mapper.MentorAvailabilityPersistenceMapper;
import com.mentormatching.modules.scheduling.infrastructure.persistence.repository.MentorAvailabilityJpaRepository;

@Component
public class MentorAvailabilityPersistenceAdapter implements MentorAvailabilityRepositoryPort {

    private final MentorAvailabilityJpaRepository mentorAvailabilityJpaRepository;
    private final MentorAvailabilityPersistenceMapper mentorAvailabilityPersistenceMapper;

    public MentorAvailabilityPersistenceAdapter(MentorAvailabilityJpaRepository mentorAvailabilityJpaRepository,
                                                MentorAvailabilityPersistenceMapper mentorAvailabilityPersistenceMapper) {
        this.mentorAvailabilityJpaRepository = mentorAvailabilityJpaRepository;
        this.mentorAvailabilityPersistenceMapper = mentorAvailabilityPersistenceMapper;
    }

    @Override
    public MentorAvailability save(MentorAvailability mentorAvailability) {
        return mentorAvailabilityPersistenceMapper.toDomain(mentorAvailabilityJpaRepository.save(
                mentorAvailabilityPersistenceMapper.toEntity(mentorAvailability)));
    }

    @Override
    public Optional<MentorAvailability> findById(Long id) {
        return mentorAvailabilityJpaRepository.findById(id).map(mentorAvailabilityPersistenceMapper::toDomain);
    }

    @Override
    public List<MentorAvailability> findByMentorId(Long mentorId) {
        return mentorAvailabilityJpaRepository
                .findByMentorIdOrderByAvailabilityTypeAscDayOfWeekAscAvailableDateAscStartTimeAsc(mentorId).stream()
                .map(mentorAvailabilityPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public List<MentorAvailability> findByAvailabilityType(AvailabilityType availabilityType) {
        return mentorAvailabilityJpaRepository.findByAvailabilityType(availabilityType).stream()
                .map(mentorAvailabilityPersistenceMapper::toDomain)
                .toList();
    }
}
