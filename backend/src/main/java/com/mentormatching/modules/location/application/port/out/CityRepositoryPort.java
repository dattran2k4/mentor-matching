package com.mentormatching.modules.location.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.location.domain.City;

public interface CityRepositoryPort {

    City save(City city);

    Optional<City> findById(Long id);

    Optional<City> findByCode(String code);

    List<City> findAll();
}
