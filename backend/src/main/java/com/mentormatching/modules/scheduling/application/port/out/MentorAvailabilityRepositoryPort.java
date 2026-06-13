package com.mentormatching.modules.scheduling.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.modules.scheduling.domain.MentorAvailability;

public interface MentorAvailabilityRepositoryPort {

    MentorAvailability save(MentorAvailability mentorAvailability);

    void delete(MentorAvailability mentorAvailability);

    Optional<MentorAvailability> findById(Long id);

    List<MentorAvailability> findByMentorId(Long mentorId);

    List<MentorAvailability> findByAvailabilityType(AvailabilityType availabilityType);
}
