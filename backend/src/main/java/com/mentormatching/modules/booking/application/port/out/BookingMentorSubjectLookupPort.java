package com.mentormatching.modules.booking.application.port.out;

import com.mentormatching.modules.booking.application.dto.BookingMentorSubjectSnapshot;

public interface BookingMentorSubjectLookupPort {

    BookingMentorSubjectSnapshot getMentorSubjectSnapshot(Long mentorSubjectId);
}
