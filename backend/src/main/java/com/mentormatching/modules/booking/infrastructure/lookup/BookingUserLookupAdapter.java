package com.mentormatching.modules.booking.infrastructure.lookup;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.application.dto.BookingUserSnapshot;
import com.mentormatching.modules.booking.application.port.out.BookingUserLookupPort;
import com.mentormatching.modules.user.application.dto.UserSummary;
import com.mentormatching.modules.user.application.port.in.GetUserSummaryUseCase;

@Component
public class BookingUserLookupAdapter implements BookingUserLookupPort {

    private final GetUserSummaryUseCase getUserSummaryUseCase;

    public BookingUserLookupAdapter(GetUserSummaryUseCase getUserSummaryUseCase) {
        this.getUserSummaryUseCase = getUserSummaryUseCase;
    }

    @Override
    public BookingUserSnapshot getUserSnapshot(Long userId) {
        UserSummary user = getUserSummaryUseCase.getUserSummary(userId);
        return new BookingUserSnapshot(user.userId(), user.fullName());
    }
}
