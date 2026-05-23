package com.mentormatching.modules.location.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.location.domain.District;

public interface DistrictRepositoryPort {

    District save(District district);

    Optional<District> findById(Long id);

    List<District> findByCityId(Long cityId);
}
