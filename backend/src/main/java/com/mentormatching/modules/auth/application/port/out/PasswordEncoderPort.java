package com.mentormatching.modules.auth.application.port.out;

public interface PasswordEncoderPort {

    String encode(String rawPassword);
}
