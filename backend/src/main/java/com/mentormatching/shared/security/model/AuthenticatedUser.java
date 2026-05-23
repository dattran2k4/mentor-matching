package com.mentormatching.shared.security.model;

import java.io.Serializable;

public record AuthenticatedUser(Long id, String username, String email, String role) implements Serializable {
}
