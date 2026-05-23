package com.mentormatching.shared.security.model;

public interface AuthenticatedPrincipal {

    Long getId();

    String getFullName();

    String getEmail();
}
