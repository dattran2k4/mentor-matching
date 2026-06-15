package com.mentormatching.modules.mentor.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.mentor.domain.MentorSubject;

public interface MentorSubjectRepositoryPort {

    MentorSubject save(MentorSubject mentorSubject);

    void delete(MentorSubject mentorSubject);

    Optional<MentorSubject> findById(Long id);

    List<MentorSubject> findByMentorId(Long mentorId);

    List<MentorSubject> findBySubjectGradeId(Long subjectGradeId);
}
