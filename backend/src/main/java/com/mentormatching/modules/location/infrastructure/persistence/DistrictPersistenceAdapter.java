package com.mentormatching.modules.location.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.location.application.port.out.DistrictRepositoryPort;
import com.mentormatching.modules.location.domain.District;
import com.mentormatching.modules.location.infrastructure.persistence.mapper.DistrictPersistenceMapper;
import com.mentormatching.modules.location.infrastructure.persistence.repository.DistrictJpaRepository;

@Component
public class DistrictPersistenceAdapter implements DistrictRepositoryPort {

    private final DistrictJpaRepository districtJpaRepository;
    private final DistrictPersistenceMapper districtPersistenceMapper;

    public DistrictPersistenceAdapter(DistrictJpaRepository districtJpaRepository,
                                      DistrictPersistenceMapper districtPersistenceMapper) {
        this.districtJpaRepository = districtJpaRepository;
        this.districtPersistenceMapper = districtPersistenceMapper;
    }

    @Override
    public District save(District district) {
        return districtPersistenceMapper.toDomain(districtJpaRepository.save(
                districtPersistenceMapper.toEntity(district)));
    }

    @Override
    public Optional<District> findById(Long id) {
        return districtJpaRepository.findById(id).map(districtPersistenceMapper::toDomain);
    }

    @Override
    public List<District> findByCityId(Long cityId) {
        return districtJpaRepository.findByCityId(cityId).stream().map(districtPersistenceMapper::toDomain).toList();
    }
}
