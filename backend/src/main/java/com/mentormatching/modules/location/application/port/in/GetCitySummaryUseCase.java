package com.mentormatching.modules.location.application.port.in;

import com.mentormatching.modules.location.application.dto.CitySummary;

public interface GetCitySummaryUseCase {

    CitySummary getCity(Long cityId);
}
