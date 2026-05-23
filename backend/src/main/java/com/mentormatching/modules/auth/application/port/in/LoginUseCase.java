package com.mentormatching.modules.auth.application.port.in;

import com.mentormatching.modules.auth.application.dto.AuthResult;
import com.mentormatching.modules.auth.application.dto.LoginCommand;

public interface LoginUseCase {

    AuthResult login(LoginCommand command);
}
