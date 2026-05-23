package com.mentormatching.modules.auth.application.dto;

public record TokenSubject(Long id, String fullName, String email, String role) {
}
