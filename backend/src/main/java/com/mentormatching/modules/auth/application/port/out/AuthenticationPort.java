package com.mentormatching.modules.auth.application.port.out;

import com.mentormatching.modules.auth.application.dto.TokenSubject;

public interface AuthenticationPort {

    TokenSubject authenticate(String email, String password);
}
