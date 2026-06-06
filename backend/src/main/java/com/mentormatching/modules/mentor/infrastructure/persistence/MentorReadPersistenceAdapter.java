package com.mentormatching.modules.mentor.infrastructure.persistence;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorDetails;
import com.mentormatching.modules.mentor.application.dto.GetMentorsQuery;
import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;
import com.mentormatching.modules.mentor.application.dto.MentorAvailabilityDetail;
import com.mentormatching.modules.mentor.application.dto.MentorDetail;
import com.mentormatching.modules.mentor.application.dto.MentorListItem;
import com.mentormatching.modules.mentor.application.dto.MentorOptionDetail;
import com.mentormatching.modules.mentor.application.dto.MentorSubjectDetail;
import com.mentormatching.modules.mentor.application.dto.MentorTraitsDetail;
import com.mentormatching.modules.mentor.application.port.out.MentorReadRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorAchievementJpaEntity;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorAchievementJpaRepository;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.CurrentMentorDetailsProjection;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorDetailProjection;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorHighlightJpaRepository;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorListItemProjection;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorOptionProjection;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorPersonalityJpaRepository;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorProfileJpaRepository;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorSubjectDetailProjection;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorSubjectJpaRepository;
import com.mentormatching.modules.scheduling.infrastructure.persistence.entity.MentorAvailabilityJpaEntity;
import com.mentormatching.modules.scheduling.infrastructure.persistence.repository.MentorAvailabilityJpaRepository;
import com.mentormatching.shared.pagination.PageableUtils;
import com.mentormatching.shared.response.PageResponse;

@Component
public class MentorReadPersistenceAdapter implements MentorReadRepositoryPort {

    private static final Set<String> SORTABLE_FIELDS = Set.of("id", "fullName", "gender", "experienceYears",
            "meetingType", "createdAt", "minPrice");

    private final MentorProfileJpaRepository mentorProfileJpaRepository;
    private final MentorSubjectJpaRepository mentorSubjectJpaRepository;
    private final MentorPersonalityJpaRepository mentorPersonalityJpaRepository;
    private final MentorHighlightJpaRepository mentorHighlightJpaRepository;
    private final MentorAchievementJpaRepository mentorAchievementJpaRepository;
    private final MentorAvailabilityJpaRepository mentorAvailabilityJpaRepository;

    public MentorReadPersistenceAdapter(MentorProfileJpaRepository mentorProfileJpaRepository,
                                        MentorSubjectJpaRepository mentorSubjectJpaRepository,
                                        MentorPersonalityJpaRepository mentorPersonalityJpaRepository,
                                        MentorHighlightJpaRepository mentorHighlightJpaRepository,
                                        MentorAchievementJpaRepository mentorAchievementJpaRepository,
                                        MentorAvailabilityJpaRepository mentorAvailabilityJpaRepository) {
        this.mentorProfileJpaRepository = mentorProfileJpaRepository;
        this.mentorSubjectJpaRepository = mentorSubjectJpaRepository;
        this.mentorPersonalityJpaRepository = mentorPersonalityJpaRepository;
        this.mentorHighlightJpaRepository = mentorHighlightJpaRepository;
        this.mentorAchievementJpaRepository = mentorAchievementJpaRepository;
        this.mentorAvailabilityJpaRepository = mentorAvailabilityJpaRepository;
    }

    @Override
    public PageResponse<MentorListItem> findApprovedMentors(GetMentorsQuery query, List<Long> subjectGradeIds) {
        Pageable pageable = PageableUtils.buildPageable(query.page(), query.size(), query.sortBy(), query.sortDir(),
                SORTABLE_FIELDS);
        Page<MentorListItemProjection> mentorPage = mentorProfileJpaRepository.findApprovedMentors(
                MentorApprovalStatus.APPROVED, containsPattern(query.search()), query.gender(), query.meetingType(),
                query.cityId(), query.districtId(), subjectGradeIds, pageable);

        return PageResponse.<MentorListItem>builder()
                .page(mentorPage.getNumber() + 1)
                .pageSize(mentorPage.getSize())
                .totalPages(mentorPage.getTotalPages())
                .totalItems(mentorPage.getTotalElements())
                .data(mentorPage.getContent().stream().map(this::toListItem).toList())
                .build();
    }

    @Override
    public Optional<CurrentMentorDetails> findCurrentMentorByUserId(Long userId) {
        return mentorProfileJpaRepository.findCurrentMentorDetailByUserId(userId)
                .map(this::toCurrentMentorDetails);
    }

    @Override
    public Optional<MentorDetail> findApprovedMentorDetailById(Long mentorId) {
        return mentorProfileJpaRepository.findApprovedMentorDetail(mentorId, MentorApprovalStatus.APPROVED)
                .map(this::toDetail);
    }

    @Override
    public boolean existsApprovedMentorById(Long mentorId) {
        return mentorProfileJpaRepository.existsByIdAndApprovalStatus(mentorId, MentorApprovalStatus.APPROVED);
    }

    @Override
    public List<MentorSubjectDetail> findMentorSubjects(Long mentorId) {
        return mentorSubjectJpaRepository.findActiveDetailsByMentorId(mentorId).stream()
                .map(this::toSubjectDetail)
                .toList();
    }

    @Override
    public MentorTraitsDetail findMentorTraits(Long mentorId) {
        List<MentorOptionDetail> personalities = mentorPersonalityJpaRepository.findOptionsByMentorId(mentorId).stream()
                .map(this::toOptionDetail)
                .toList();
        List<MentorOptionDetail> highlights = mentorHighlightJpaRepository.findOptionsByMentorId(mentorId).stream()
                .map(this::toOptionDetail)
                .toList();
        return new MentorTraitsDetail(personalities, highlights);
    }

    @Override
    public List<MentorAchievementDetail> findMentorAchievements(Long mentorId) {
        return mentorAchievementJpaRepository.findByMentorIdOrderByAchievedAtDescIdDesc(mentorId).stream()
                .map(this::toAchievementDetail)
                .toList();
    }

    @Override
    public List<MentorAvailabilityDetail> findMentorAvailabilities(Long mentorId) {
        return mentorAvailabilityJpaRepository
                .findByMentorIdOrderByAvailabilityTypeAscDayOfWeekAscAvailableDateAscStartTimeAsc(mentorId)
                .stream()
                .map(this::toAvailabilityDetail)
                .toList();
    }

    private MentorListItem toListItem(MentorListItemProjection projection) {
        return new MentorListItem(projection.getId(), projection.getUserId(), projection.getFullName(),
                projection.getAvatarUrl(), projection.getGender(), projection.getHeadline(),
                projection.getExperienceYears(), projection.getCurrentPosition(), projection.getWorkplace(),
                projection.getEducation(), projection.getMajor(), projection.getMeetingType(), projection.getMinPrice(),
                projection.getCreatedAt());
    }

    private MentorDetail toDetail(MentorDetailProjection projection) {
        return new MentorDetail(projection.getId(), projection.getUserId(), projection.getFullName(),
                projection.getAvatarUrl(), projection.getGender(), projection.getHometownCityId(),
                projection.getHometownCityName(), projection.getCurrentCityId(), projection.getCurrentCityName(),
                projection.getCurrentDistrictId(), projection.getCurrentDistrictName(), projection.getHeadline(),
                projection.getIntroduction(), projection.getTeachingStyle(), projection.getExperienceYears(),
                projection.getCurrentPosition(), projection.getWorkplace(), projection.getEducation(),
                projection.getMajor(), projection.getMeetingType(), projection.getCreatedAt(), projection.getUpdatedAt());
    }

    private CurrentMentorDetails toCurrentMentorDetails(CurrentMentorDetailsProjection projection) {
        return new CurrentMentorDetails(projection.getId(), projection.getUserId(), projection.getFullName(),
                projection.getAvatarUrl(), projection.getGender(), projection.getHometownCityId(),
                projection.getHometownCityName(), projection.getCurrentCityId(), projection.getCurrentCityName(),
                projection.getCurrentDistrictId(), projection.getCurrentDistrictName(), projection.getHeadline(),
                projection.getIntroduction(), projection.getTeachingStyle(), projection.getExperienceYears(),
                projection.getCurrentPosition(), projection.getWorkplace(), projection.getEducation(),
                projection.getMajor(), projection.getMeetingType(), projection.getApprovalStatus(),
                projection.getApprovalNote(), projection.getVerificationStatus(),
                projection.getVerificationRejectionReason(), projection.getCreatedAt(), projection.getUpdatedAt());
    }

    private MentorSubjectDetail toSubjectDetail(MentorSubjectDetailProjection projection) {
        return new MentorSubjectDetail(projection.getId(), projection.getSubjectGradeId(), projection.getSubjectId(),
                projection.getSubjectName(), projection.getGradeId(), projection.getGradeName(),
                projection.getProficiencyLevel(), projection.getTeachingNote(), projection.getPricePerHour(),
                projection.getActive());
    }

    private MentorOptionDetail toOptionDetail(MentorOptionProjection projection) {
        return new MentorOptionDetail(projection.getId(), projection.getName(), projection.getDescription());
    }

    private MentorAchievementDetail toAchievementDetail(MentorAchievementJpaEntity entity) {
        return new MentorAchievementDetail(entity.getId(), entity.getTitle(), entity.getDescription(),
                entity.getAchievementType(), entity.getIssuer(), entity.getAchievedAt(), entity.getProofUrl(),
                entity.getVerified());
    }

    private MentorAvailabilityDetail toAvailabilityDetail(MentorAvailabilityJpaEntity entity) {
        return new MentorAvailabilityDetail(entity.getId(), entity.getAvailabilityType(), entity.getDayOfWeek(),
                entity.getAvailableDate(), entity.getStartTime(), entity.getEndTime());
    }

    private String containsPattern(String value) {
        return StringUtils.hasText(value) ? "%" + value.trim().toLowerCase() + "%" : null;
    }
}
