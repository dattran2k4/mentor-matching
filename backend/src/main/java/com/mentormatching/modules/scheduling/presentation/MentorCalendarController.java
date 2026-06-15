package com.mentormatching.modules.scheduling.presentation;

import java.time.LocalDate;

import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.scheduling.application.dto.GetMentorCalendarQuery;
import com.mentormatching.modules.scheduling.application.port.in.GetMentorCalendarUseCase;
import com.mentormatching.modules.scheduling.presentation.dto.response.MentorCalendarResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/mentors")
public class MentorCalendarController {

    private final GetMentorCalendarUseCase getMentorCalendarUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @GetMapping("/{mentorId}/calendar-booking")
    public ApiResponse<MentorCalendarResponse> getMentorCalendar(@Min(1) @PathVariable Long mentorId,
                                                                 @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
                                                                 @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return apiResponseFactory.success(MentorCalendarResponse.from(
                        getMentorCalendarUseCase.getMentorCalendar(new GetMentorCalendarQuery(mentorId, from, to))),
                "Get mentor calendar successfully");
    }
}
