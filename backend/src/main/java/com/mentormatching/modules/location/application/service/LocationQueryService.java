package com.mentormatching.modules.location.application.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.location.application.dto.CitySummary;
import com.mentormatching.modules.location.application.port.in.GetCitiesUseCase;
import com.mentormatching.modules.location.application.port.out.CityRepositoryPort;
import com.mentormatching.modules.location.domain.City;
import com.mentormatching.shared.text.SearchTextUtils;

@Service
public class LocationQueryService implements GetCitiesUseCase {

    private final CityRepositoryPort cityRepositoryPort;

    public LocationQueryService(CityRepositoryPort cityRepositoryPort) {
        this.cityRepositoryPort = cityRepositoryPort;
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

    private boolean matches(City city, String normalizedSearch) {
        if (normalizedSearch.isBlank()) {
            return true;
        }
        return SearchTextUtils.normalizeForSearch(city.getName()).contains(normalizedSearch);
    }
}
