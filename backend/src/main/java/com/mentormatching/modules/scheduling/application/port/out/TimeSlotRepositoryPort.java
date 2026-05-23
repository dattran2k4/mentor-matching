package com.mentormatching.modules.scheduling.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.scheduling.domain.TimeSlot;

public interface TimeSlotRepositoryPort {

    TimeSlot save(TimeSlot timeSlot);

    Optional<TimeSlot> findById(Long id);

    List<TimeSlot> findByDayOfWeek(Integer dayOfWeek);

    List<TimeSlot> findAll();
}
