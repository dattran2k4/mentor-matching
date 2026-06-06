package com.mentormatching.modules.mentor.application.dto;

public record UpsertCurrentMentorVerificationCommand(Long userId, String fullName, String idCardNumber,
                                                     String idCardFrontUrl, String idCardBackUrl,
                                                     String selfieWithIdUrl) {
}
