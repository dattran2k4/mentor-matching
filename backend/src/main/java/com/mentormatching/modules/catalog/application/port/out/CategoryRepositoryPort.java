package com.mentormatching.modules.catalog.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.catalog.domain.Category;

public interface CategoryRepositoryPort {

    Category save(Category category);

    Optional<Category> findById(Long id);

    List<Category> findAll();
}
