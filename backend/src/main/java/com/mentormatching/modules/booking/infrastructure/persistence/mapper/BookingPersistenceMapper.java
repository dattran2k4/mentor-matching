package com.mentormatching.modules.booking.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingRestoreData;
import com.mentormatching.modules.booking.infrastructure.persistence.entity.BookingJpaEntity;

@Component
public class BookingPersistenceMapper {

    public Booking toDomain(BookingJpaEntity entity) {
        return Booking.restore(new BookingRestoreData(entity.getId(), entity.getStudentUserId(),
                entity.getStudentName(), entity.getMentorId(), entity.getMentorName(), entity.getMentorSubjectId(),
                entity.getSubjectName(), entity.getGradeName(), entity.getMentorAvailabilityId(),
                entity.getTimeSlotId(), entity.getBookingDate(), entity.getStartTime(), entity.getEndTime(),
                entity.getTimeSlotLabel(), entity.getPricePerHour(), entity.getTotalAmount(),
                entity.getMeetingType(), entity.getMeetingLink(), entity.getMeetingAddress(), entity.getStatus(),
                entity.getNote(), entity.getCancelledBy(), entity.getCancelReason(), entity.getCreatedAt(),
                entity.getUpdatedAt()));
    }

    public BookingJpaEntity toEntity(Booking booking) {
        return BookingJpaEntity.builder()
                .id(booking.getId())
                .studentUserId(booking.getStudentUserId())
                .studentName(booking.getStudentName())
                .mentorId(booking.getMentorId())
                .mentorName(booking.getMentorName())
                .mentorSubjectId(booking.getMentorSubjectId())
                .subjectName(booking.getSubjectName())
                .gradeName(booking.getGradeName())
                .mentorAvailabilityId(booking.getMentorAvailabilityId())
                .timeSlotId(booking.getTimeSlotId())
                .bookingDate(booking.getBookingDate())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .timeSlotLabel(booking.getTimeSlotLabel())
                .pricePerHour(booking.getPricePerHour())
                .totalAmount(booking.getTotalAmount())
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
