package com.mentormatching.modules.scheduling.application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.scheduling.application.dto.GetMentorCalendarQuery;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDetail;
import com.mentormatching.modules.scheduling.application.port.in.GetMentorCalendarUseCase;

@Service
public class MentorCalendarQueryService implements GetMentorCalendarUseCase {

    @Override
    public MentorCalendarDetail getMentorCalendar(GetMentorCalendarQuery query) {
        return new MentorCalendarDetail(query.mentorId(), query.from(), query.to(), List.of());
    }
}
