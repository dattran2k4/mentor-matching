package com.mentormatching.modules.location.domain;

import java.time.LocalDateTime;

public record CityRestoreData(Long id, String name, String code, LocalDateTime createdAt,
                              LocalDateTime updatedAt) {
}
