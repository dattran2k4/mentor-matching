package com.mentormatching.modules.scheduling.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.scheduling.application.port.out.TimeSlotRepositoryPort;
import com.mentormatching.modules.scheduling.domain.TimeSlot;
import com.mentormatching.modules.scheduling.infrastructure.persistence.mapper.TimeSlotPersistenceMapper;
import com.mentormatching.modules.scheduling.infrastructure.persistence.repository.TimeSlotJpaRepository;

@Component
public class TimeSlotPersistenceAdapter implements TimeSlotRepositoryPort {

    private final TimeSlotJpaRepository timeSlotJpaRepository;
    private final TimeSlotPersistenceMapper timeSlotPersistenceMapper;

    public TimeSlotPersistenceAdapter(TimeSlotJpaRepository timeSlotJpaRepository,
                                      TimeSlotPersistenceMapper timeSlotPersistenceMapper) {
        this.timeSlotJpaRepository = timeSlotJpaRepository;
        this.timeSlotPersistenceMapper = timeSlotPersistenceMapper;
    }

    @Override
    public TimeSlot save(TimeSlot timeSlot) {
        return timeSlotPersistenceMapper.toDomain(timeSlotJpaRepository.save(timeSlotPersistenceMapper.toEntity(timeSlot)));
    }

    @Override
    public Optional<TimeSlot> findById(Long id) {
        return timeSlotJpaRepository.findById(id).map(timeSlotPersistenceMapper::toDomain);
    }

    @Override
    public List<TimeSlot> findByDayOfWeek(Integer dayOfWeek) {
        return timeSlotJpaRepository.findByDayOfWeek(dayOfWeek).stream().map(timeSlotPersistenceMapper::toDomain).toList();
    }

    @Override
    public List<TimeSlot> findAll() {
        return timeSlotJpaRepository.findAll().stream().map(timeSlotPersistenceMapper::toDomain).toList();
    }
}
