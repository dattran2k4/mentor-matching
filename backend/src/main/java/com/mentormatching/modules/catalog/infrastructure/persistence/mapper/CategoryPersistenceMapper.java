package com.mentormatching.modules.catalog.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.catalog.domain.Category;
import com.mentormatching.modules.catalog.domain.CategoryRestoreData;
import com.mentormatching.modules.catalog.infrastructure.persistence.entity.CategoryJpaEntity;

@Component
public class CategoryPersistenceMapper {

    public Category toDomain(CategoryJpaEntity entity) {
        return Category.restore(new CategoryRestoreData(entity.getId(), entity.getName(), entity.getDescription(),
                entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public CategoryJpaEntity toEntity(Category category) {
        return CategoryJpaEntity.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
}
