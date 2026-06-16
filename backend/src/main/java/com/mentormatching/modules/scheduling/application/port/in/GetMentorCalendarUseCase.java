package com.mentormatching.modules.scheduling.application.port.in;

import com.mentormatching.modules.scheduling.application.dto.GetMentorCalendarQuery;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDetail;

public interface GetMentorCalendarUseCase {

    MentorCalendarDetail getMentorCalendar(GetMentorCalendarQuery query);
}
