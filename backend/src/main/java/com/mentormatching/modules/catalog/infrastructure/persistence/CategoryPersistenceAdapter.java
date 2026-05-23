package com.mentormatching.modules.catalog.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.catalog.application.port.out.CategoryRepositoryPort;
import com.mentormatching.modules.catalog.domain.Category;
import com.mentormatching.modules.catalog.infrastructure.persistence.mapper.CategoryPersistenceMapper;
import com.mentormatching.modules.catalog.infrastructure.persistence.repository.CategoryJpaRepository;

@Component
public class CategoryPersistenceAdapter implements CategoryRepositoryPort {

    private final CategoryJpaRepository categoryJpaRepository;
    private final CategoryPersistenceMapper categoryPersistenceMapper;

    public CategoryPersistenceAdapter(CategoryJpaRepository categoryJpaRepository,
                                      CategoryPersistenceMapper categoryPersistenceMapper) {
        this.categoryJpaRepository = categoryJpaRepository;
        this.categoryPersistenceMapper = categoryPersistenceMapper;
    }

    @Override
    public Category save(Category category) {
        return categoryPersistenceMapper.toDomain(categoryJpaRepository.save(categoryPersistenceMapper.toEntity(category)));
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryJpaRepository.findById(id).map(categoryPersistenceMapper::toDomain);
    }

    @Override
    public List<Category> findAll() {
        return categoryJpaRepository.findAll().stream().map(categoryPersistenceMapper::toDomain).toList();
    }
}
