package com.mentormatching.modules.mentor.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.catalog.application.dto.SubjectGradeSummary;
import com.mentormatching.modules.mentor.application.dto.MentorSubjectDetail;
import com.mentormatching.modules.mentor.application.dto.UpsertCurrentMentorSubjectCommand;
import com.mentormatching.modules.mentor.application.port.in.DeleteCurrentMentorSubjectUseCase;
import com.mentormatching.modules.mentor.application.port.in.UpsertCurrentMentorSubjectUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorCatalogLookupPort;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorSubjectRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorSubject;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class MentorSubjectService implements UpsertCurrentMentorSubjectUseCase, DeleteCurrentMentorSubjectUseCase {

    private final MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private final MentorSubjectRepositoryPort mentorSubjectRepositoryPort;
    private final MentorCatalogLookupPort mentorCatalogLookupPort;

    public MentorSubjectService(MentorProfileRepositoryPort mentorProfileRepositoryPort,
                                MentorSubjectRepositoryPort mentorSubjectRepositoryPort,
                                MentorCatalogLookupPort mentorCatalogLookupPort) {
        this.mentorProfileRepositoryPort = mentorProfileRepositoryPort;
        this.mentorSubjectRepositoryPort = mentorSubjectRepositoryPort;
        this.mentorCatalogLookupPort = mentorCatalogLookupPort;
    }

    @Override
    @Transactional
    public MentorSubjectDetail upsertCurrentMentorSubject(UpsertCurrentMentorSubjectCommand command) {
        MentorProfile mentorProfile = mentorProfileRepositoryPort.findByUserId(command.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
        SubjectGradeSummary subjectGrade = mentorCatalogLookupPort.getSubjectGradeSummary(command.subjectGradeId());
        List<MentorSubject> mentorSubjects = mentorSubjectRepositoryPort.findByMentorId(mentorProfile.getId());

        MentorSubject mentorSubject = command.id() == null
                ? createMentorSubject(mentorProfile.getId(), mentorSubjects, command)
                : updateMentorSubject(mentorProfile.getId(), mentorSubjects, command);

        MentorSubject savedMentorSubject = mentorSubjectRepositoryPort.save(mentorSubject);
        return toDetail(savedMentorSubject, subjectGrade);
    }

    @Override
    @Transactional
    public void deleteCurrentMentorSubject(Long userId, Long mentorSubjectId) {
        MentorProfile mentorProfile = mentorProfileRepositoryPort.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
        MentorSubject mentorSubject = mentorSubjectRepositoryPort.findById(mentorSubjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor subject not found"));
        if (!mentorProfile.getId().equals(mentorSubject.getMentorId())) {
            throw new ResourceNotFoundException("Mentor subject not found");
        }
        mentorSubjectRepositoryPort.delete(mentorSubject);
    }

    private MentorSubject createMentorSubject(Long mentorId, List<MentorSubject> mentorSubjects,
                                              UpsertCurrentMentorSubjectCommand command) {
        ensureSubjectGradeNotDuplicated(mentorSubjects, command.subjectGradeId(), null);
        return MentorSubject.create(mentorId, command.subjectGradeId(), command.proficiencyLevel(),
                command.teachingNote(), command.pricePerHour(), command.active());
    }

    private MentorSubject updateMentorSubject(Long mentorId, List<MentorSubject> mentorSubjects,
                                              UpsertCurrentMentorSubjectCommand command) {
        MentorSubject mentorSubject = mentorSubjects.stream()
                .filter(subject -> command.id().equals(subject.getId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Mentor subject not found"));
        if (!mentorId.equals(mentorSubject.getMentorId())) {
            throw new ResourceNotFoundException("Mentor subject not found");
        }
        ensureSubjectGradeNotDuplicated(mentorSubjects, command.subjectGradeId(), mentorSubject.getId());
        mentorSubject.updateOffering(command.subjectGradeId(), command.proficiencyLevel(), command.teachingNote(),
                command.pricePerHour(), command.active());
        return mentorSubject;
    }

    private void ensureSubjectGradeNotDuplicated(List<MentorSubject> mentorSubjects, Long subjectGradeId,
                                                 Long currentMentorSubjectId) {
        boolean duplicated = mentorSubjects.stream()
                .anyMatch(subject -> subjectGradeId.equals(subject.getSubjectGradeId())
                        && (currentMentorSubjectId == null || !currentMentorSubjectId.equals(subject.getId())));
        if (duplicated) {
            throw new InvalidDataException("Mentor subject already exists for this subject grade");
        }
    }

    private MentorSubjectDetail toDetail(MentorSubject mentorSubject, SubjectGradeSummary subjectGrade) {
        return new MentorSubjectDetail(mentorSubject.getId(), mentorSubject.getSubjectGradeId(),
                subjectGrade.subjectId(), subjectGrade.subjectName(), subjectGrade.gradeId(),
                subjectGrade.gradeName(), mentorSubject.getProficiencyLevel(), mentorSubject.getTeachingNote(),
                mentorSubject.getPricePerHour(), mentorSubject.getActive());
    }
}
