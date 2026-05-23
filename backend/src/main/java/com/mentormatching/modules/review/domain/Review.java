package com.mentormatching.modules.review.domain;

import java.time.LocalDateTime;

public class Review {

    private final Long id;
    private final Long bookingId;
    private final Long studentUserId;
    private final Long mentorId;
    private Integer rating;
    private String comment;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Review(ReviewRestoreData data) {
        this.id = data.id();
        this.bookingId = data.bookingId();
        this.studentUserId = data.studentUserId();
        this.mentorId = data.mentorId();
        this.rating = data.rating();
        this.comment = data.comment();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static Review restore(ReviewRestoreData data) {
        return new Review(data);
    }

    public Long getId() {
        return id;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public Long getStudentUserId() {
        return studentUserId;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public Integer getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
