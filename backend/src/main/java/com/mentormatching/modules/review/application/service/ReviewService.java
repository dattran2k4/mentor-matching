package com.mentormatching.modules.review.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.review.application.dto.CreateReviewCommand;
import com.mentormatching.modules.review.application.port.in.CreateReviewUseCase;
import com.mentormatching.modules.review.application.port.out.ReviewBookingLookupPort;
import com.mentormatching.modules.review.application.port.out.ReviewRepositoryPort;
import com.mentormatching.modules.review.domain.Review;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class ReviewService implements CreateReviewUseCase {

    private final ReviewRepositoryPort reviewRepositoryPort;
    private final ReviewBookingLookupPort reviewBookingLookupPort;

    public ReviewService(ReviewRepositoryPort reviewRepositoryPort,
                         ReviewBookingLookupPort reviewBookingLookupPort) {
        this.reviewRepositoryPort = reviewRepositoryPort;
        this.reviewBookingLookupPort = reviewBookingLookupPort;
    }

    @Override
    @Transactional
    public Long createReview(CreateReviewCommand command) {
        Booking booking = reviewBookingLookupPort.getBooking(command.bookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getStudentUserId().equals(command.studentUserId())) {
            throw new InvalidDataException("You are not authorized to review this booking");
        }

        if (booking.getStatus() != BookingStatus.COMPLETED) {
            throw new InvalidDataException("Only completed bookings can be reviewed");
        }

        if (reviewRepositoryPort.findByBookingId(command.bookingId()).isPresent()) {
            throw new InvalidDataException("This booking has already been reviewed");
        }

        Review review = Review.create(
                command.bookingId(),
                command.studentUserId(),
                booking.getMentorId(),
                command.rating(),
                command.comment()
        );

        Review savedReview = reviewRepositoryPort.save(review);
        return savedReview.getId();
    }
}
