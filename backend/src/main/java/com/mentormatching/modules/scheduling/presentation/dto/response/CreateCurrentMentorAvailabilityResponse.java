package com.mentormatching.modules.scheduling.presentation.dto.response;

public record CreateCurrentMentorAvailabilityResponse(Long availabilityId) {

    public static CreateCurrentMentorAvailabilityResponse from(Long availabilityId) {
        return new CreateCurrentMentorAvailabilityResponse(availabilityId);
    }
}
