package com.mentormatching.modules.location.presentation.dto.response;

import com.mentormatching.modules.location.application.dto.DistrictSummary;

public record DistrictResponse(Long id, Long cityId, String code, String name) {

    public static DistrictResponse from(DistrictSummary district) {
        return new DistrictResponse(district.id(), district.cityId(), district.code(), district.name());
    }
}
