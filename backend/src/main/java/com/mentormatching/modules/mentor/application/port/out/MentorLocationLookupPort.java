package com.mentormatching.modules.mentor.application.port.out;

import com.mentormatching.modules.location.application.dto.CitySummary;
import com.mentormatching.modules.location.application.dto.DistrictSummary;

public interface MentorLocationLookupPort {

    CitySummary getCity(Long cityId);

    DistrictSummary getDistrict(Long districtId);
}
