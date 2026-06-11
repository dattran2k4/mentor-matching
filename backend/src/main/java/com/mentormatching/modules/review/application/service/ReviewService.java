package com.mentormatching.modules.review.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.review.application.dto.CreateReviewCommand;
import com.mentormatching.modules.review.application.dto.MentorReviewItem;
import com.mentormatching.modules.review.application.dto.ReviewDetail;
import com.mentormatching.modules.review.application.port.in.CreateReviewUseCase;
import com.mentormatching.modules.review.application.port.in.GetMentorReviewsUseCase;
import com.mentormatching.modules.review.application.port.in.GetReviewDetailUseCase;
import com.mentormatching.modules.review.application.port.out.ReviewBookingLookupPort;
import com.mentormatching.modules.review.application.port.out.ReviewMentorLookupPort;
import com.mentormatching.modules.review.application.port.out.ReviewRepositoryPort;
import com.mentormatching.modules.review.application.port.out.ReviewUserLookupPort;
import com.mentormatching.modules.review.domain.Review;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;
import com.mentormatching.shared.response.PageResponse;

@Service
public class ReviewService implements CreateReviewUseCase, GetReviewDetailUseCase, GetMentorReviewsUseCase {

    private final ReviewRepositoryPort reviewRepositoryPort;
    private final ReviewBookingLookupPort reviewBookingLookupPort;
    private final ReviewUserLookupPort reviewUserLookupPort;
    private final ReviewMentorLookupPort reviewMentorLookupPort;

    public ReviewService(ReviewRepositoryPort reviewRepositoryPort,
                         ReviewBookingLookupPort reviewBookingLookupPort,
                         ReviewUserLookupPort reviewUserLookupPort,
                         ReviewMentorLookupPort reviewMentorLookupPort) {
        this.reviewRepositoryPort = reviewRepositoryPort;
        this.reviewBookingLookupPort = reviewBookingLookupPort;
        this.reviewUserLookupPort = reviewUserLookupPort;
        this.reviewMentorLookupPort = reviewMentorLookupPort;
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

    @Override
    @Transactional(readOnly = true)
    public ReviewDetail getReviewDetail(Long id) {
        Review review = reviewRepositoryPort.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        String studentName = reviewUserLookupPort.getUserFullName(review.getStudentUserId());
        Long mentorUserId = reviewMentorLookupPort.getUserId(review.getMentorId());
        String mentorName = mentorUserId != null ? reviewUserLookupPort.getUserFullName(mentorUserId) : null;

        return new ReviewDetail(
                review.getId(),
                review.getBookingId(),
                review.getStudentUserId(),
                studentName,
                review.getMentorId(),
                mentorName,
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUpdatedAt()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<MentorReviewItem> getMentorReviews(Long mentorId, int page, int size, String sortBy, String sortDir) {
        PageResponse<Review> reviewPage = reviewRepositoryPort.findByMentorId(mentorId, page, size, sortBy, sortDir);

        List<MentorReviewItem> items = reviewPage.getData().stream().map(review -> {
            String studentName = reviewUserLookupPort.getUserFullName(review.getStudentUserId());
            return new MentorReviewItem(
                    review.getId(),
                    review.getBookingId(),
                    review.getStudentUserId(),
                    studentName,
                    review.getRating(),
                    review.getComment(),
                    review.getCreatedAt()
            );
        }).toList();

        return PageResponse.<MentorReviewItem>builder()
                .page(reviewPage.getPage())
                .pageSize(reviewPage.getPageSize())
                .totalPages(reviewPage.getTotalPages())
                .totalItems(reviewPage.getTotalItems())
                .data(items)
                .build();
    }
}
