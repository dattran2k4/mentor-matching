package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorSubjectJpaEntity;

public interface MentorSubjectJpaRepository extends JpaRepository<MentorSubjectJpaEntity, Long> {

    List<MentorSubjectJpaEntity> findByMentorId(Long mentorId);

    List<MentorSubjectJpaEntity> findBySubjectGradeId(Long subjectGradeId);
}
