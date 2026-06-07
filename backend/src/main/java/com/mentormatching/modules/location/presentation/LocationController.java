package com.mentormatching.modules.location.presentation;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.location.application.port.in.GetCitiesUseCase;
import com.mentormatching.modules.location.application.port.in.GetDistrictsByCityUseCase;
import com.mentormatching.modules.location.presentation.dto.response.CityResponse;
import com.mentormatching.modules.location.presentation.dto.response.DistrictResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/locations")
public class LocationController {

    private final GetCitiesUseCase getCitiesUseCase;
    private final GetDistrictsByCityUseCase getDistrictsByCityUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @GetMapping("/cities")
    public ApiResponse<List<CityResponse>> getCities(@RequestParam(required = false) String search) {
        List<CityResponse> cities = getCitiesUseCase.getCities(search).stream().map(CityResponse::from).toList();
        return apiResponseFactory.success(cities, "Get cities successfully");
    }

    @GetMapping("/cities/{cityId}/districts")
    public ApiResponse<List<DistrictResponse>> getDistricts(@PathVariable Long cityId,
                                                            @RequestParam(required = false) String search) {
        List<DistrictResponse> districts = getDistrictsByCityUseCase.getDistricts(cityId, search).stream()
                .map(DistrictResponse::from)
                .toList();
        return apiResponseFactory.success(districts, "Get districts successfully");
    }
}
