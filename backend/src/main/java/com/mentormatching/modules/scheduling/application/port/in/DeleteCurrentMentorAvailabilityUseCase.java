package com.mentormatching.modules.scheduling.application.port.in;

public interface DeleteCurrentMentorAvailabilityUseCase {

    void deleteCurrentMentorAvailability(Long userId, Long availabilityId);
}
