package com.mentormatching.modules.mentor.application.port.out;

import java.util.List;

import com.mentormatching.modules.mentor.domain.MentorHighlight;

public interface MentorHighlightRepositoryPort {

    List<MentorHighlight> saveAll(List<MentorHighlight> mentorHighlights);

    List<MentorHighlight> findByMentorId(Long mentorId);

    void deleteByMentorId(Long mentorId);
}
