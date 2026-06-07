package com.mentormatching.modules.location.application.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.location.application.dto.CitySummary;
import com.mentormatching.modules.location.application.dto.DistrictSummary;
import com.mentormatching.modules.location.application.port.in.GetCitiesUseCase;
import com.mentormatching.modules.location.application.port.in.GetCitySummaryUseCase;
import com.mentormatching.modules.location.application.port.in.GetDistrictSummaryUseCase;
import com.mentormatching.modules.location.application.port.in.GetDistrictsByCityUseCase;
import com.mentormatching.modules.location.application.port.out.CityRepositoryPort;
import com.mentormatching.modules.location.application.port.out.DistrictRepositoryPort;
import com.mentormatching.modules.location.domain.City;
import com.mentormatching.modules.location.domain.District;
import com.mentormatching.shared.exception.ResourceNotFoundException;
import com.mentormatching.shared.text.SearchTextUtils;

@Service
@Transactional(readOnly = true)
public class LocationQueryService implements GetCitiesUseCase, GetDistrictsByCityUseCase, GetCitySummaryUseCase,
        GetDistrictSummaryUseCase {

    private final CityRepositoryPort cityRepositoryPort;
    private final DistrictRepositoryPort districtRepositoryPort;

    public LocationQueryService(CityRepositoryPort cityRepositoryPort,
                                DistrictRepositoryPort districtRepositoryPort) {
        this.cityRepositoryPort = cityRepositoryPort;
        this.districtRepositoryPort = districtRepositoryPort;
    }

    @Override
    public List<CitySummary> getCities(String search) {
        String normalizedSearch = SearchTextUtils.normalizeForSearch(search);
        return cityRepositoryPort.findAll().stream()
                .filter(city -> matches(city, normalizedSearch))
                .sorted(Comparator.comparing(City::getName))
                .map(city -> new CitySummary(city.getId(), city.getCode(), city.getName()))
                .toList();
    }

    @Override
    public List<DistrictSummary> getDistricts(Long cityId, String search) {
        ensureCityExists(cityId);
        String normalizedSearch = SearchTextUtils.normalizeForSearch(search);
        return districtRepositoryPort.findByCityId(cityId).stream()
                .filter(district -> matches(district, normalizedSearch))
                .sorted(Comparator.comparing(District::getName))
                .map(district -> new DistrictSummary(district.getId(), district.getCityId(), district.getCode(),
                        district.getName()))
                .toList();
    }

    @Override
    public CitySummary getCity(Long cityId) {
        City city = cityRepositoryPort.findById(cityId)
                .orElseThrow(() -> new ResourceNotFoundException("City not found"));
        return new CitySummary(city.getId(), city.getCode(), city.getName());
    }

    @Override
    public DistrictSummary getDistrict(Long districtId) {
        District district = districtRepositoryPort.findById(districtId)
                .orElseThrow(() -> new ResourceNotFoundException("District not found"));
        return new DistrictSummary(district.getId(), district.getCityId(), district.getCode(), district.getName());
    }

    private boolean matches(City city, String normalizedSearch) {
        if (normalizedSearch.isBlank()) {
            return true;
        }
        return SearchTextUtils.normalizeForSearch(city.getName()).contains(normalizedSearch);
    }

    private boolean matches(District district, String normalizedSearch) {
        if (normalizedSearch.isBlank()) {
            return true;
        }
        return SearchTextUtils.normalizeForSearch(district.getName()).contains(normalizedSearch);
    }

    private void ensureCityExists(Long cityId) {
        if (cityRepositoryPort.findById(cityId).isEmpty()) {
            throw new ResourceNotFoundException("City not found");
        }
    }
}
