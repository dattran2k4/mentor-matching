package com.mentormatching.modules.location.application.port.in;

import java.util.List;

import com.mentormatching.modules.location.application.dto.DistrictSummary;

public interface GetDistrictsByCityUseCase {

    List<DistrictSummary> getDistricts(Long cityId, String search);
}
