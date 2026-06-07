package com.mentormatching.modules.mentor.infrastructure.lookup;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.location.application.dto.CitySummary;
import com.mentormatching.modules.location.application.dto.DistrictSummary;
import com.mentormatching.modules.location.application.port.in.GetCitySummaryUseCase;
import com.mentormatching.modules.location.application.port.in.GetDistrictSummaryUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorLocationLookupPort;

@Component
public class MentorLocationLookupAdapter implements MentorLocationLookupPort {

    private final GetCitySummaryUseCase getCitySummaryUseCase;
    private final GetDistrictSummaryUseCase getDistrictSummaryUseCase;

    public MentorLocationLookupAdapter(GetCitySummaryUseCase getCitySummaryUseCase,
                                       GetDistrictSummaryUseCase getDistrictSummaryUseCase) {
        this.getCitySummaryUseCase = getCitySummaryUseCase;
        this.getDistrictSummaryUseCase = getDistrictSummaryUseCase;
    }

    @Override
    public CitySummary getCity(Long cityId) {
        return getCitySummaryUseCase.getCity(cityId);
    }

    @Override
    public DistrictSummary getDistrict(Long districtId) {
        return getDistrictSummaryUseCase.getDistrict(districtId);
    }
}
