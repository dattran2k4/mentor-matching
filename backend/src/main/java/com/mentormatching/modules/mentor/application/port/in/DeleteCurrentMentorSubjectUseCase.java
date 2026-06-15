package com.mentormatching.modules.mentor.application.port.in;

public interface DeleteCurrentMentorSubjectUseCase {

    void deleteCurrentMentorSubject(Long userId, Long mentorSubjectId);
}
