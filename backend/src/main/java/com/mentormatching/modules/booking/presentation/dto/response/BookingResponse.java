package com.mentormatching.modules.booking.presentation.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingMeetingType;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.shared.response.PageResponse;

public record BookingResponse(Long id, Long studentUserId, String studentName, Long mentorId, String mentorName,
                              Long mentorSubjectId, String subjectName, String gradeName,
                              LocalDate bookingDate, LocalTime startTime, LocalTime endTime,
                              BigDecimal pricePerHour, BigDecimal totalAmount,
                              BookingMeetingType meetingType, String meetingLink, String meetingAddress,
                              BookingStatus status, String note, Long cancelledBy, String cancelReason,
                              LocalDateTime createdAt, LocalDateTime updatedAt) {

    public static BookingResponse from(Booking booking) {
        return new BookingResponse(booking.getId(), booking.getStudentUserId(), booking.getStudentName(),
                booking.getMentorId(), booking.getMentorName(), booking.getMentorSubjectId(),
                booking.getSubjectName(), booking.getGradeName(), booking.getBookingDate(), booking.getStartTime(),
                booking.getEndTime(), booking.getPricePerHour(), booking.getTotalAmount(),
                booking.getMeetingType(), booking.getMeetingLink(), booking.getMeetingAddress(), booking.getStatus(),
                booking.getNote(), booking.getCancelledBy(), booking.getCancelReason(), booking.getCreatedAt(),
                booking.getUpdatedAt());
    }

    public static PageResponse<BookingResponse> from(PageResponse<Booking> bookings) {
        List<BookingResponse> data = bookings.getData().stream().map(BookingResponse::from).toList();
        return PageResponse.<BookingResponse>builder()
                .page(bookings.getPage())
                .pageSize(bookings.getPageSize())
                .totalPages(bookings.getTotalPages())
                .totalItems(bookings.getTotalItems())
                .data(data)
                .build();
    }
}
