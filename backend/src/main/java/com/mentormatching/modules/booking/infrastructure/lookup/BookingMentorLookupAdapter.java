package com.mentormatching.modules.booking.infrastructure.lookup;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.application.dto.BookingMentorSnapshot;
import com.mentormatching.modules.booking.application.dto.BookingUserSnapshot;
import com.mentormatching.modules.booking.application.port.out.BookingMentorLookupPort;
import com.mentormatching.modules.booking.application.port.out.BookingUserLookupPort;
import com.mentormatching.modules.mentor.application.dto.MentorSummary;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSummaryByUserUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSummaryUseCase;

@Component
public class BookingMentorLookupAdapter implements BookingMentorLookupPort {

    private final GetMentorSummaryUseCase getMentorSummaryUseCase;
    private final GetMentorSummaryByUserUseCase getMentorSummaryByUserUseCase;
    private final BookingUserLookupPort bookingUserLookupPort;

    public BookingMentorLookupAdapter(GetMentorSummaryUseCase getMentorSummaryUseCase,
                                      GetMentorSummaryByUserUseCase getMentorSummaryByUserUseCase,
                                      BookingUserLookupPort bookingUserLookupPort) {
        this.getMentorSummaryUseCase = getMentorSummaryUseCase;
        this.getMentorSummaryByUserUseCase = getMentorSummaryByUserUseCase;
        this.bookingUserLookupPort = bookingUserLookupPort;
    }

    @Override
    public BookingMentorSnapshot getMentorSnapshot(Long mentorId) {
        MentorSummary mentor = getMentorSummaryUseCase.getMentorSummary(mentorId);
        BookingUserSnapshot mentorUser = bookingUserLookupPort.getUserSnapshot(mentor.userId());
        return new BookingMentorSnapshot(mentor.mentorId(), mentor.userId(), mentorUser.fullName(),
                mentor.meetingType());
    }

    @Override
    public BookingMentorSnapshot getMentorSnapshotByUserId(Long userId) {
        MentorSummary mentor = getMentorSummaryByUserUseCase.getMentorSummaryByUserId(userId);
        BookingUserSnapshot mentorUser = bookingUserLookupPort.getUserSnapshot(mentor.userId());
        return new BookingMentorSnapshot(mentor.mentorId(), mentor.userId(), mentorUser.fullName(),
                mentor.meetingType());
    }
}
