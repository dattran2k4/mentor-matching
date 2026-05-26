package com.mentormatching.modules.booking.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.booking.application.dto.BookingMentorSubjectSnapshot;
import com.mentormatching.modules.booking.application.dto.BookingMentorSnapshot;
import com.mentormatching.modules.booking.application.dto.BookingUserSnapshot;
import com.mentormatching.modules.booking.application.dto.CreateBookingCommand;
import com.mentormatching.modules.booking.application.dto.GetMyBookingsQuery;
import com.mentormatching.modules.booking.application.port.in.CreateBookingUseCase;
import com.mentormatching.modules.booking.application.port.in.GetMyBookingsUseCase;
import com.mentormatching.modules.booking.application.port.out.BookingAvailabilityLookupPort;
import com.mentormatching.modules.booking.application.port.out.BookingMentorLookupPort;
import com.mentormatching.modules.booking.application.port.out.BookingMentorSubjectLookupPort;
import com.mentormatching.modules.booking.application.port.out.BookingRepositoryPort;
import com.mentormatching.modules.booking.application.port.out.BookingUserLookupPort;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingCreateData;
import com.mentormatching.modules.booking.domain.BookingMeetingType;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.response.PageResponse;

@Service
public class BookingService implements CreateBookingUseCase, GetMyBookingsUseCase {

    private static final List<BookingStatus> SCHEDULE_BLOCKING_STATUSES = List.of(BookingStatus.PENDING,
            BookingStatus.CONFIRMED);

    private final BookingRepositoryPort bookingRepositoryPort;
    private final BookingUserLookupPort bookingUserLookupPort;
    private final BookingMentorLookupPort bookingMentorLookupPort;
    private final BookingMentorSubjectLookupPort bookingMentorSubjectLookupPort;
    private final BookingAvailabilityLookupPort bookingAvailabilityLookupPort;

    public BookingService(BookingRepositoryPort bookingRepositoryPort, BookingUserLookupPort bookingUserLookupPort,
                          BookingMentorLookupPort bookingMentorLookupPort,
                          BookingMentorSubjectLookupPort bookingMentorSubjectLookupPort,
                          BookingAvailabilityLookupPort bookingAvailabilityLookupPort) {
        this.bookingRepositoryPort = bookingRepositoryPort;
        this.bookingUserLookupPort = bookingUserLookupPort;
        this.bookingMentorLookupPort = bookingMentorLookupPort;
        this.bookingMentorSubjectLookupPort = bookingMentorSubjectLookupPort;
        this.bookingAvailabilityLookupPort = bookingAvailabilityLookupPort;
    }

    @Override
    @Transactional
    public Long createBooking(CreateBookingCommand command) {
        BookingUserSnapshot student = bookingUserLookupPort.getUserSnapshot(command.studentUserId());
        BookingMentorSnapshot mentor = bookingMentorLookupPort.getMentorSnapshot(command.mentorId());
        BookingMentorSubjectSnapshot mentorSubject = bookingMentorSubjectLookupPort.getMentorSubjectSnapshot(
                command.mentorSubjectId());
        validateMentorSubject(command, mentorSubject);
        validateMeetingType(command.meetingType(), mentor.meetingType());
        validateMentorAvailability(command);
        validateMentorScheduleAvailable(command);

        Booking booking = Booking.create(new BookingCreateData(command.studentUserId(), student.fullName(),
                command.mentorId(), mentor.fullName(), command.mentorSubjectId(), mentorSubject.subjectName(),
                mentorSubject.gradeName(), command.bookingDate(), command.startTime(), command.endTime(),
                mentorSubject.pricePerHour(), command.meetingType(), command.note()));

        Booking savedBooking = bookingRepositoryPort.save(booking);
        return savedBooking.getId();
    }

    @Override
    public PageResponse<Booking> getMyBookings(GetMyBookingsQuery query) {
        return bookingRepositoryPort.findMyBookings(query);
    }

    private void validateMentorSubject(CreateBookingCommand command, BookingMentorSubjectSnapshot mentorSubject) {
        if (!mentorSubject.mentorId().equals(command.mentorId())) {
            throw new InvalidDataException("Mentor subject does not belong to mentor");
        }
        if (!mentorSubject.active()) {
            throw new InvalidDataException("Mentor subject is not active");
        }
    }

    private void validateMeetingType(BookingMeetingType bookingMeetingType, MeetingType mentorMeetingType) {
        if (mentorMeetingType == MeetingType.HYBRID) {
            return;
        }
        if (mentorMeetingType == null || !mentorMeetingType.name().equals(bookingMeetingType.name())) {
            throw new InvalidDataException("Mentor does not support this meeting type");
        }
    }

    private void validateMentorAvailability(CreateBookingCommand command) {
        boolean available = bookingAvailabilityLookupPort.isMentorAvailable(command.mentorId(), command.bookingDate(),
                command.startTime(), command.endTime());
        if (!available) {
            throw new InvalidDataException("Mentor is not available at this time");
        }
    }

    private void validateMentorScheduleAvailable(CreateBookingCommand command) {
        boolean overlapping = bookingRepositoryPort.existsOverlappingBooking(command.mentorId(), command.bookingDate(),
                command.startTime(), command.endTime(), SCHEDULE_BLOCKING_STATUSES);
        if (overlapping) {
            throw new InvalidDataException("Mentor already has a booking at this time");
        }
    }
}

