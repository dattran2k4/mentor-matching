package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

import com.mentormatching.shared.exception.InvalidDataException;

public class MentorVerification {

    private final Long id;
    private final Long mentorId;
    private String fullName;
    private String idCardNumber;
    private String idCardFrontUrl;
    private String idCardBackUrl;
    private String selfieWithIdUrl;
    private MentorVerificationStatus verificationStatus;
    private Long verifiedBy;
    private LocalDateTime verifiedAt;
    private String rejectionReason;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private MentorVerification(MentorVerificationRestoreData data) {
        this.id = data.id();
        this.mentorId = data.mentorId();
        this.fullName = data.fullName();
        this.idCardNumber = data.idCardNumber();
        this.idCardFrontUrl = data.idCardFrontUrl();
        this.idCardBackUrl = data.idCardBackUrl();
        this.selfieWithIdUrl = data.selfieWithIdUrl();
        this.verificationStatus = data.verificationStatus();
        this.verifiedBy = data.verifiedBy();
        this.verifiedAt = data.verifiedAt();
        this.rejectionReason = data.rejectionReason();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static MentorVerification restore(MentorVerificationRestoreData data) {
        return new MentorVerification(data);
    }

    public static MentorVerification submit(Long mentorId, String fullName, String idCardNumber,
                                            String idCardFrontUrl, String idCardBackUrl,
                                            String selfieWithIdUrl) {
        return new MentorVerification(new MentorVerificationRestoreData(null, mentorId, fullName, idCardNumber,
                idCardFrontUrl, idCardBackUrl, selfieWithIdUrl, MentorVerificationStatus.PENDING, null, null, null,
                null, null));
    }

    public void resubmit(String fullName, String idCardNumber, String idCardFrontUrl, String idCardBackUrl,
                         String selfieWithIdUrl) {
        this.fullName = fullName;
        this.idCardNumber = idCardNumber;
        this.idCardFrontUrl = idCardFrontUrl;
        this.idCardBackUrl = idCardBackUrl;
        this.selfieWithIdUrl = selfieWithIdUrl;
        this.verificationStatus = MentorVerificationStatus.PENDING;
        this.verifiedBy = null;
        this.verifiedAt = null;
        this.rejectionReason = null;
    }

    public void verify(Long adminUserId) {
        validatePendingForReview();
        if (adminUserId == null) {
            throw new InvalidDataException("Admin user id is required when verifying verification");
        }
        this.verificationStatus = MentorVerificationStatus.VERIFIED;
        this.verifiedBy = adminUserId;
        this.verifiedAt = LocalDateTime.now();
        this.rejectionReason = null;
    }

    public void reject(String rejectionReason) {
        validatePendingForReview();
        if (rejectionReason == null || rejectionReason.isBlank()) {
            throw new InvalidDataException("Rejection reason is required when rejecting verification");
        }
        this.verificationStatus = MentorVerificationStatus.REJECTED;
        this.verifiedBy = null;
        this.verifiedAt = null;
        this.rejectionReason = rejectionReason.trim();
    }

    private void validatePendingForReview() {
        if (verificationStatus != MentorVerificationStatus.PENDING) {
            throw new InvalidDataException("Only pending verification can be reviewed");
        }
    }

    public Long getId() {
        return id;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getIdCardNumber() {
        return idCardNumber;
    }

    public String getIdCardFrontUrl() {
        return idCardFrontUrl;
    }

    public String getIdCardBackUrl() {
        return idCardBackUrl;
    }

    public String getSelfieWithIdUrl() {
        return selfieWithIdUrl;
    }

    public MentorVerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public Long getVerifiedBy() {
        return verifiedBy;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
