package com.mentormatching.modules.location.application.port.in;

import com.mentormatching.modules.location.application.dto.DistrictSummary;

public interface GetDistrictSummaryUseCase {

    DistrictSummary getDistrict(Long districtId);
}
