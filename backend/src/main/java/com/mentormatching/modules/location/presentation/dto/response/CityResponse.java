package com.mentormatching.modules.location.presentation.dto.response;

import com.mentormatching.modules.location.application.dto.CitySummary;

public record CityResponse(Long id, String code, String name) {

    public static CityResponse from(CitySummary city) {
        return new CityResponse(city.id(), city.code(), city.name());
    }
}
