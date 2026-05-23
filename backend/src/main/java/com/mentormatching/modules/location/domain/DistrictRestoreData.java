package com.mentormatching.modules.location.domain;

import java.time.LocalDateTime;

public record DistrictRestoreData(Long id, Long cityId, String name, String code, LocalDateTime createdAt,
                                  LocalDateTime updatedAt) {
}
