package com.mentormatching.modules.location.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.location.application.port.out.CityRepositoryPort;
import com.mentormatching.modules.location.domain.City;
import com.mentormatching.modules.location.infrastructure.persistence.mapper.CityPersistenceMapper;
import com.mentormatching.modules.location.infrastructure.persistence.repository.CityJpaRepository;

@Component
public class CityPersistenceAdapter implements CityRepositoryPort {

    private final CityJpaRepository cityJpaRepository;
    private final CityPersistenceMapper cityPersistenceMapper;

    public CityPersistenceAdapter(CityJpaRepository cityJpaRepository,
                                  CityPersistenceMapper cityPersistenceMapper) {
        this.cityJpaRepository = cityJpaRepository;
        this.cityPersistenceMapper = cityPersistenceMapper;
    }

    @Override
    public City save(City city) {
        return cityPersistenceMapper.toDomain(cityJpaRepository.save(cityPersistenceMapper.toEntity(city)));
    }

    @Override
    public Optional<City> findById(Long id) {
        return cityJpaRepository.findById(id).map(cityPersistenceMapper::toDomain);
    }

    @Override
    public Optional<City> findByCode(String code) {
        return cityJpaRepository.findByCode(code).map(cityPersistenceMapper::toDomain);
    }

    @Override
    public List<City> findAll() {
        return cityJpaRepository.findAll().stream().map(cityPersistenceMapper::toDomain).toList();
    }
}
