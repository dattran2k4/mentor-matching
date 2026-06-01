package com.mentormatching.modules.mentor.application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.mentor.application.dto.GetMentorsQuery;
import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;
import com.mentormatching.modules.mentor.application.dto.MentorAvailabilityDetail;
import com.mentormatching.modules.mentor.application.dto.MentorDetail;
import com.mentormatching.modules.mentor.application.dto.MentorListItem;
import com.mentormatching.modules.mentor.application.dto.MentorSubjectDetail;
import com.mentormatching.modules.mentor.application.dto.MentorSubjectSummary;
import com.mentormatching.modules.mentor.application.dto.MentorSummary;
import com.mentormatching.modules.mentor.application.dto.MentorTraitsDetail;
import com.mentormatching.modules.mentor.application.port.in.GetMentorAchievementsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorAvailabilitiesUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorDetailUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSubjectsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSubjectSummaryUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSummaryByUserUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorTraitsUseCase;
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
public class MentorQueryService implements GetMentorSummaryUseCase, GetMentorSubjectSummaryUseCase, GetMentorsUseCase,
        GetMentorDetailUseCase, GetMentorSubjectsUseCase, GetMentorTraitsUseCase, GetMentorAchievementsUseCase,
        GetMentorAvailabilitiesUseCase, GetMentorSummaryByUserUseCase {

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
    public MentorDetail getMentorDetail(Long mentorId) {
        return mentorReadRepositoryPort.findApprovedMentorDetailById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
    }

    @Override
    public List<MentorSubjectDetail> getMentorSubjects(Long mentorId) {
        ensureApprovedMentorExists(mentorId);
        return mentorReadRepositoryPort.findMentorSubjects(mentorId);
    }

    @Override
    public MentorTraitsDetail getMentorTraits(Long mentorId) {
        ensureApprovedMentorExists(mentorId);
        return mentorReadRepositoryPort.findMentorTraits(mentorId);
    }

    @Override
    public List<MentorAchievementDetail> getMentorAchievements(Long mentorId) {
        ensureApprovedMentorExists(mentorId);
        return mentorReadRepositoryPort.findMentorAchievements(mentorId);
    }

    @Override
    public List<MentorAvailabilityDetail> getMentorAvailabilities(Long mentorId) {
        ensureApprovedMentorExists(mentorId);
        return mentorReadRepositoryPort.findMentorAvailabilities(mentorId);
    }

    @Override
    public MentorSummary getMentorSummary(Long mentorId) {
        MentorProfile mentor = mentorProfileRepositoryPort.findById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
        return new MentorSummary(mentor.getId(), mentor.getUserId(), mentor.getMeetingType());
    }

    @Override
    public MentorSummary getMentorSummaryByUserId(Long userId) {
        MentorProfile mentor = mentorProfileRepositoryPort.findByUserId(userId)
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

    private void ensureApprovedMentorExists(Long mentorId) {
        if (!mentorReadRepositoryPort.existsApprovedMentorById(mentorId)) {
            throw new ResourceNotFoundException("Mentor profile not found");
        }
    }
}
