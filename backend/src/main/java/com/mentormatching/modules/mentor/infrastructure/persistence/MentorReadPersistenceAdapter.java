package com.mentormatching.modules.mentor.infrastructure.persistence;

import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_BY;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_DIR;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.mentormatching.modules.mentor.application.dto.GetMentorsQuery;
import com.mentormatching.modules.mentor.application.dto.MentorListItem;
import com.mentormatching.modules.mentor.application.port.out.MentorReadRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorListItemProjection;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorProfileJpaRepository;
import com.mentormatching.shared.response.PageResponse;

@Component
public class MentorReadPersistenceAdapter implements MentorReadRepositoryPort {

    private static final Set<String> SORTABLE_FIELDS = Set.of("id", "fullName", "gender", "experienceYears",
            "meetingType", "createdAt");

    private final MentorProfileJpaRepository mentorProfileJpaRepository;

    public MentorReadPersistenceAdapter(MentorProfileJpaRepository mentorProfileJpaRepository) {
        this.mentorProfileJpaRepository = mentorProfileJpaRepository;
    }

    @Override
    public PageResponse<MentorListItem> findApprovedMentors(GetMentorsQuery query) {
        Pageable pageable = buildPageable(query.page(), query.size(), query.sortBy(), query.sortDir());
        Page<MentorListItemProjection> mentorPage = mentorProfileJpaRepository.findApprovedMentors(
                MentorApprovalStatus.APPROVED, containsPattern(query.search()), query.gender(), query.meetingType(),
                query.cityId(), query.districtId(), pageable);

        return PageResponse.<MentorListItem>builder()
                .page(mentorPage.getNumber() + 1)
                .pageSize(mentorPage.getSize())
                .totalPages(mentorPage.getTotalPages())
                .totalItems(mentorPage.getTotalElements())
                .data(mentorPage.getContent().stream().map(this::toListItem).toList())
                .build();
    }

    private MentorListItem toListItem(MentorListItemProjection projection) {
        return new MentorListItem(projection.getId(), projection.getUserId(), projection.getFullName(),
                projection.getAvatarUrl(), projection.getGender(), projection.getHeadline(),
                projection.getExperienceYears(), projection.getCurrentPosition(), projection.getWorkplace(),
                projection.getEducation(), projection.getMajor(), projection.getMeetingType(), projection.getCreatedAt());
    }

    private Pageable buildPageable(int page, int size, String sortBy, String sortDir) {
        int pageNumber = page > 0 ? page - 1 : 0;
        return PageRequest.of(pageNumber, size, buildSort(sortBy, sortDir));
    }

    private Sort buildSort(String sortBy, String sortDir) {
        String safeSortBy = sortBy != null && SORTABLE_FIELDS.contains(sortBy) ? sortBy : DEFAULT_SORT_BY;
        String safeSortDir = sortDir == null || sortDir.isBlank() ? DEFAULT_SORT_DIR : sortDir;
        Sort.Direction direction = Sort.Direction.fromOptionalString(safeSortDir)
                .orElse(Sort.Direction.fromString(DEFAULT_SORT_DIR));
        return Sort.by(direction, safeSortBy);
    }

    private String containsPattern(String value) {
        return StringUtils.hasText(value) ? "%" + value.trim().toLowerCase() + "%" : null;
    }
}
