package com.mentormatching.modules.mentor.presentation;

import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_PAGE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SIZE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_BY;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_DIR;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.mentor.application.dto.GetMentorsQuery;
import com.mentormatching.modules.mentor.application.dto.MentorListItem;
import com.mentormatching.modules.mentor.application.port.in.GetMentorsUseCase;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorListItemResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.response.PageResponse;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
@RequestMapping("/api/v1/mentors")
public class MentorController {

    private final GetMentorsUseCase getMentorsUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @GetMapping
    public ApiResponse<PageResponse<MentorListItemResponse>> getMentors(@RequestParam(defaultValue = DEFAULT_PAGE) @Min(1) int page,
                                                                        @RequestParam(defaultValue = DEFAULT_SIZE) @Min(1) @Max(100) int size,
                                                                        @RequestParam(defaultValue = DEFAULT_SORT_BY) String sortBy,
                                                                        @RequestParam(defaultValue = DEFAULT_SORT_DIR) String sortDir,
                                                                        @RequestParam(required = false) String search,
                                                                        @RequestParam(required = false) Gender gender,
                                                                        @RequestParam(required = false) MeetingType meetingType,
                                                                        @RequestParam(required = false) Long cityId,
                                                                        @RequestParam(required = false) Long districtId) {
        PageResponse<MentorListItem> mentors = getMentorsUseCase.getMentors(new GetMentorsQuery(page, size, sortBy,
                sortDir, search, gender, meetingType, cityId, districtId));
        return apiResponseFactory.success(MentorListItemResponse.from(mentors), "Get mentors successfully");
    }
}
