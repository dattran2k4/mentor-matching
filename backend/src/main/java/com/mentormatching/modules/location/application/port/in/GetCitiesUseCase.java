package com.mentormatching.modules.location.application.port.in;

import java.util.List;

import com.mentormatching.modules.location.application.dto.CitySummary;

public interface GetCitiesUseCase {

    List<CitySummary> getCities(String search);
}
