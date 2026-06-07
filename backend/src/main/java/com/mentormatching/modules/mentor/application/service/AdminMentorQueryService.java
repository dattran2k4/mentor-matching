package com.mentormatching.modules.mentor.application.service;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.mentor.application.dto.AdminMentorDetail;
import com.mentormatching.modules.mentor.application.dto.AdminMentorListItem;
import com.mentormatching.modules.mentor.application.dto.GetAdminMentorsQuery;
import com.mentormatching.modules.mentor.application.port.in.GetAdminMentorDetailUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetAdminMentorsUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorCatalogLookupPort;
import com.mentormatching.modules.mentor.application.port.out.MentorReadRepositoryPort;
import com.mentormatching.shared.exception.ResourceNotFoundException;
import com.mentormatching.shared.response.PageResponse;

@Service
public class AdminMentorQueryService implements GetAdminMentorsUseCase, GetAdminMentorDetailUseCase {

    private final MentorReadRepositoryPort mentorReadRepositoryPort;
    private final MentorCatalogLookupPort mentorCatalogLookupPort;

    public AdminMentorQueryService(MentorReadRepositoryPort mentorReadRepositoryPort,
                                   MentorCatalogLookupPort mentorCatalogLookupPort) {
        this.mentorReadRepositoryPort = mentorReadRepositoryPort;
        this.mentorCatalogLookupPort = mentorCatalogLookupPort;
    }

    @Override
    public PageResponse<AdminMentorListItem> getAdminMentors(GetAdminMentorsQuery query) {
        List<Long> subjectGradeIds = null;
        if (query.subjectId() != null || query.gradeId() != null) {
            subjectGradeIds = mentorCatalogLookupPort.getSubjectGradeIds(query.subjectId(), query.gradeId());
            if (subjectGradeIds.isEmpty()) {
                return PageResponse.<AdminMentorListItem>builder()
                        .page(query.page())
                        .pageSize(query.size())
                        .totalItems(0)
                        .totalPages(0)
                        .data(Collections.emptyList())
                        .build();
            }
        }
        return mentorReadRepositoryPort.findAdminMentors(query, subjectGradeIds);
    }

    @Override
    public AdminMentorDetail getAdminMentorDetail(Long mentorId) {
        return mentorReadRepositoryPort.findAdminMentorDetailById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
    }
}
