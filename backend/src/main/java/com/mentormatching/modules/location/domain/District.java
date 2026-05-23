package com.mentormatching.modules.location.domain;

import java.time.LocalDateTime;

public class District {

    private final Long id;
    private final Long cityId;
    private final String name;
    private final String code;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    private District(DistrictRestoreData data) {
        this.id = data.id();
        this.cityId = data.cityId();
        this.name = data.name();
        this.code = data.code();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static District restore(DistrictRestoreData data) {
        return new District(data);
    }

    public Long getId() {
        return id;
    }

    public Long getCityId() {
        return cityId;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
