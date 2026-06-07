package com.mentormatching.modules.mentor.application.port.out;

import java.util.List;

import com.mentormatching.modules.mentor.domain.MentorPersonality;

public interface MentorPersonalityRepositoryPort {

    List<MentorPersonality> saveAll(List<MentorPersonality> mentorPersonalities);

    List<MentorPersonality> findByMentorId(Long mentorId);

    void deleteByMentorId(Long mentorId);
}
