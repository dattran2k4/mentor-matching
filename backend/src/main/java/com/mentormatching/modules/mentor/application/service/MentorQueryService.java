package com.mentormatching.modules.mentor.application.service;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.mentor.application.dto.GetMentorsQuery;
import com.mentormatching.modules.mentor.application.dto.MentorListItem;
import com.mentormatching.modules.mentor.application.dto.MentorSubjectSummary;
import com.mentormatching.modules.mentor.application.dto.MentorSummary;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSubjectSummaryUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSummaryUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorReadRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorSubjectRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorSubject;
import com.mentormatching.shared.exception.ResourceNotFoundException;
import com.mentormatching.shared.response.PageResponse;

@Service
public class MentorQueryService implements GetMentorSummaryUseCase, GetMentorSubjectSummaryUseCase, GetMentorsUseCase {

    private final MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private final MentorSubjectRepositoryPort mentorSubjectRepositoryPort;
    private final MentorReadRepositoryPort mentorReadRepositoryPort;

    public MentorQueryService(MentorProfileRepositoryPort mentorProfileRepositoryPort,
                              MentorSubjectRepositoryPort mentorSubjectRepositoryPort,
                              MentorReadRepositoryPort mentorReadRepositoryPort) {
        this.mentorProfileRepositoryPort = mentorProfileRepositoryPort;
        this.mentorSubjectRepositoryPort = mentorSubjectRepositoryPort;
        this.mentorReadRepositoryPort = mentorReadRepositoryPort;
    }

    @Override
    public PageResponse<MentorListItem> getMentors(GetMentorsQuery query) {
        return mentorReadRepositoryPort.findApprovedMentors(query);
    }

    @Override
    public MentorSummary getMentorSummary(Long mentorId) {
        MentorProfile mentor = mentorProfileRepositoryPort.findById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
        return new MentorSummary(mentor.getId(), mentor.getUserId(), mentor.getMeetingType());
    }

    @Override
    public MentorSubjectSummary getMentorSubjectSummary(Long mentorSubjectId) {
        MentorSubject mentorSubject = mentorSubjectRepositoryPort.findById(mentorSubjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor subject not found"));
        return new MentorSubjectSummary(mentorSubject.getId(), mentorSubject.getMentorId(),
                mentorSubject.getSubjectGradeId(), mentorSubject.getPricePerHour(),
                Boolean.TRUE.equals(mentorSubject.getActive()));
    }
}
