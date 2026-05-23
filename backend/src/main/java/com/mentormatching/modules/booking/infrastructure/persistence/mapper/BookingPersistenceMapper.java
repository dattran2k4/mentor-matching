package com.mentormatching.modules.booking.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingRestoreData;
import com.mentormatching.modules.booking.infrastructure.persistence.entity.BookingJpaEntity;

@Component
public class BookingPersistenceMapper {

    public Booking toDomain(BookingJpaEntity entity) {
        return Booking.restore(new BookingRestoreData(entity.getId(), entity.getStudentUserId(), entity.getMentorId(),
                entity.getMentorSubjectId(), entity.getMentorAvailabilityId(), entity.getBookingDate(),
                entity.getMeetingType(), entity.getMeetingLink(), entity.getMeetingAddress(), entity.getStatus(),
                entity.getNote(), entity.getCancelledBy(), entity.getCancelReason(), entity.getCreatedAt(),
                entity.getUpdatedAt()));
    }

    public BookingJpaEntity toEntity(Booking booking) {
        return BookingJpaEntity.builder()
                .id(booking.getId())
                .studentUserId(booking.getStudentUserId())
                .mentorId(booking.getMentorId())
                .mentorSubjectId(booking.getMentorSubjectId())
                .mentorAvailabilityId(booking.getMentorAvailabilityId())
                .bookingDate(booking.getBookingDate())
                .meetingType(booking.getMeetingType())
                .meetingLink(booking.getMeetingLink())
                .meetingAddress(booking.getMeetingAddress())
                .status(booking.getStatus())
                .note(booking.getNote())
                .cancelledBy(booking.getCancelledBy())
                .cancelReason(booking.getCancelReason())
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .build();
    }
}
