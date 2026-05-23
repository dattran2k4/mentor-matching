package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

public class MentorProfile {

    private final Long id;
    private final Long userId;
    private String avatarUrl;
    private Gender gender;
    private Long hometownCityId;
    private Long currentDistrictId;
    private String headline;
    private String introduction;
    private String teachingStyle;
    private Integer experienceYears;
    private String currentPosition;
    private String workplace;
    private String education;
    private String major;
    private MeetingType meetingType;
    private MentorApprovalStatus approvalStatus;
    private String approvalNote;
    private Long approvedBy;
    private LocalDateTime approvedAt;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private MentorProfile(MentorProfileRestoreData data) {
        this.id = data.id();
        this.userId = data.userId();
        this.avatarUrl = data.avatarUrl();
        this.gender = data.gender();
        this.hometownCityId = data.hometownCityId();
        this.currentDistrictId = data.currentDistrictId();
        this.headline = data.headline();
        this.introduction = data.introduction();
        this.teachingStyle = data.teachingStyle();
        this.experienceYears = data.experienceYears();
        this.currentPosition = data.currentPosition();
        this.workplace = data.workplace();
        this.education = data.education();
        this.major = data.major();
        this.meetingType = data.meetingType();
        this.approvalStatus = data.approvalStatus();
        this.approvalNote = data.approvalNote();
        this.approvedBy = data.approvedBy();
        this.approvedAt = data.approvedAt();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static MentorProfile restore(MentorProfileRestoreData data) {
        return new MentorProfile(data);
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public Gender getGender() {
        return gender;
    }

    public Long getHometownCityId() {
        return hometownCityId;
    }

    public Long getCurrentDistrictId() {
        return currentDistrictId;
    }

    public String getHeadline() {
        return headline;
    }

    public String getIntroduction() {
        return introduction;
    }

    public String getTeachingStyle() {
        return teachingStyle;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public String getCurrentPosition() {
        return currentPosition;
    }

    public String getWorkplace() {
        return workplace;
    }

    public String getEducation() {
        return education;
    }

    public String getMajor() {
        return major;
    }

    public MeetingType getMeetingType() {
        return meetingType;
    }

    public MentorApprovalStatus getApprovalStatus() {
        return approvalStatus;
    }

    public String getApprovalNote() {
        return approvalNote;
    }

    public Long getApprovedBy() {
        return approvedBy;
    }

    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
