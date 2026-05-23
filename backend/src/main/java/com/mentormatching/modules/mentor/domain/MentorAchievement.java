package com.mentormatching.modules.mentor.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MentorAchievement {

    private final Long id;
    private final Long mentorId;
    private String title;
    private String description;
    private AchievementType achievementType;
    private String issuer;
    private LocalDate achievedAt;
    private String proofUrl;
    private Boolean verified;
    private Long verifiedBy;
    private LocalDateTime verifiedAt;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private MentorAchievement(MentorAchievementRestoreData data) {
        this.id = data.id();
        this.mentorId = data.mentorId();
        this.title = data.title();
        this.description = data.description();
        this.achievementType = data.achievementType();
        this.issuer = data.issuer();
        this.achievedAt = data.achievedAt();
        this.proofUrl = data.proofUrl();
        this.verified = data.verified();
        this.verifiedBy = data.verifiedBy();
        this.verifiedAt = data.verifiedAt();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static MentorAchievement restore(MentorAchievementRestoreData data) {
        return new MentorAchievement(data);
    }

    public Long getId() {
        return id;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public AchievementType getAchievementType() {
        return achievementType;
    }

    public String getIssuer() {
        return issuer;
    }

    public LocalDate getAchievedAt() {
        return achievedAt;
    }

    public String getProofUrl() {
        return proofUrl;
    }

    public Boolean getVerified() {
        return verified;
    }

    public Long getVerifiedBy() {
        return verifiedBy;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
