package com.mentormatching.modules.booking.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Booking {

    private final Long id;
    private final Long studentUserId;
    private final Long mentorId;
    private final Long mentorSubjectId;
    private final Long mentorAvailabilityId;
    private final LocalDate bookingDate;
    private BookingMeetingType meetingType;
    private String meetingLink;
    private String meetingAddress;
    private BookingStatus status;
    private String note;
    private Long cancelledBy;
    private String cancelReason;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Booking(BookingRestoreData data) {
        this.id = data.id();
        this.studentUserId = data.studentUserId();
        this.mentorId = data.mentorId();
        this.mentorSubjectId = data.mentorSubjectId();
        this.mentorAvailabilityId = data.mentorAvailabilityId();
        this.bookingDate = data.bookingDate();
        this.meetingType = data.meetingType();
        this.meetingLink = data.meetingLink();
        this.meetingAddress = data.meetingAddress();
        this.status = data.status();
        this.note = data.note();
        this.cancelledBy = data.cancelledBy();
        this.cancelReason = data.cancelReason();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static Booking restore(BookingRestoreData data) {
        return new Booking(data);
    }

    public Long getId() {
        return id;
    }

    public Long getStudentUserId() {
        return studentUserId;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public Long getMentorSubjectId() {
        return mentorSubjectId;
    }

    public Long getMentorAvailabilityId() {
        return mentorAvailabilityId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public BookingMeetingType getMeetingType() {
        return meetingType;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public String getMeetingAddress() {
        return meetingAddress;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public String getNote() {
        return note;
    }

    public Long getCancelledBy() {
        return cancelledBy;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
