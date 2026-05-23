package com.mentormatching.modules.location.domain;

import java.time.LocalDateTime;

public class City {

    private final Long id;
    private final String name;
    private final String code;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    private City(CityRestoreData data) {
        this.id = data.id();
        this.name = data.name();
        this.code = data.code();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static City restore(CityRestoreData data) {
        return new City(data);
    }

    public Long getId() {
        return id;
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
