package com.mentormatching.modules.location.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.location.domain.City;
import com.mentormatching.modules.location.domain.CityRestoreData;
import com.mentormatching.modules.location.infrastructure.persistence.entity.CityJpaEntity;

@Component
public class CityPersistenceMapper {

    public City toDomain(CityJpaEntity entity) {
        return City.restore(new CityRestoreData(entity.getId(), entity.getName(), entity.getCode(),
                entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public CityJpaEntity toEntity(City city) {
        return CityJpaEntity.builder()
                .id(city.getId())
                .name(city.getName())
                .code(city.getCode())
                .createdAt(city.getCreatedAt())
                .updatedAt(city.getUpdatedAt())
                .build();
    }
}
