package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorSubjectJpaEntity;

public interface MentorSubjectJpaRepository extends JpaRepository<MentorSubjectJpaEntity, Long> {

    List<MentorSubjectJpaEntity> findByMentorId(Long mentorId);

    List<MentorSubjectJpaEntity> findBySubjectGradeId(Long subjectGradeId);

    @Query("""
            select mentorSubject.id as id,
                   mentorSubject.subjectGradeId as subjectGradeId,
                   subject.id as subjectId,
                   subject.name as subjectName,
                   grade.id as gradeId,
                   grade.name as gradeName,
                   mentorSubject.proficiencyLevel as proficiencyLevel,
                   mentorSubject.teachingNote as teachingNote,
                   mentorSubject.pricePerHour as pricePerHour,
                   mentorSubject.active as active
            from MentorSubjectJpaEntity mentorSubject
            join SubjectGradeJpaEntity subjectGrade on subjectGrade.id = mentorSubject.subjectGradeId
            join SubjectJpaEntity subject on subject.id = subjectGrade.subjectId
            left join GradeJpaEntity grade on grade.id = subjectGrade.gradeId
            where mentorSubject.mentorId = :mentorId
              and mentorSubject.active = true
            order by subject.name, grade.name, mentorSubject.id
            """)
    List<MentorSubjectDetailProjection> findActiveDetailsByMentorId(@Param("mentorId") Long mentorId);
}
