package com.mentormatching.modules.location.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.location.domain.District;
import com.mentormatching.modules.location.domain.DistrictRestoreData;
import com.mentormatching.modules.location.infrastructure.persistence.entity.DistrictJpaEntity;

@Component
public class DistrictPersistenceMapper {

    public District toDomain(DistrictJpaEntity entity) {
        return District.restore(new DistrictRestoreData(entity.getId(), entity.getCityId(), entity.getName(),
                entity.getCode(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public DistrictJpaEntity toEntity(District district) {
        return DistrictJpaEntity.builder()
                .id(district.getId())
                .cityId(district.getCityId())
                .name(district.getName())
                .code(district.getCode())
                .createdAt(district.getCreatedAt())
                .updatedAt(district.getUpdatedAt())
                .build();
    }
}
