package com.mentormatching.modules.user.domain;

import java.time.LocalDateTime;

import com.mentormatching.shared.exception.InvalidDataException;

public class User {

    private final Long id;
    private String fullName;
    private final String email;
    private String password;
    private String phone;
    private UserRole role;
    private UserType userType;
    private UserStatus status;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private User(UserRestoreData data) {
        this.id = data.id();
        this.fullName = data.fullName();
        this.email = data.email();
        this.password = data.password();
        this.phone = data.phone();
        this.role = data.role();
        this.userType = data.userType();
        this.status = data.status();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static User register(String fullName, String email, String encodedPassword, String phone,
                                UserType userType) {
        LocalDateTime now = LocalDateTime.now();
        return new User(new UserRestoreData(null, fullName, email, encodedPassword, phone,
                UserRole.LEARNER, userType, UserStatus.ACTIVE, now, now));
    }

    public static User restore(UserRestoreData data) {
        return new User(data);
    }

    public boolean canLogin() {
        return status == UserStatus.ACTIVE;
    }

    public void ban() {
        status = UserStatus.BANNED;
        touch();
    }

    public void deactivate() {
        status = UserStatus.INACTIVE;
        touch();
    }

    public void activate() {
        status = UserStatus.ACTIVE;
        touch();
    }

    public void changePassword(String encodedPassword) {
        password = encodedPassword;
        touch();
    }

    public void updateProfile(String fullName, String phone, UserType userType) {
        this.fullName = fullName;
        this.phone = phone;
        this.userType = userType;
        touch();
    }

    public void promoteToMentor() {
        if (role == UserRole.MENTOR) {
            return;
        }
        if (role != UserRole.LEARNER) {
            throw new InvalidDataException("User role cannot be promoted to mentor");
        }
        this.role = UserRole.MENTOR;
        touch();
    }

    private void touch() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public UserRole getRole() {
        return role;
    }

    public UserType getUserType() {
        return userType;
    }

    public UserStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
