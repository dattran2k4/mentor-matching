package com.mentormatching.modules.catalog.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.catalog.infrastructure.persistence.entity.SubjectGradeJpaEntity;

public interface SubjectGradeJpaRepository extends JpaRepository<SubjectGradeJpaEntity, Long> {

    List<SubjectGradeJpaEntity> findBySubjectId(Long subjectId);

    List<SubjectGradeJpaEntity> findByGradeId(Long gradeId);
}
