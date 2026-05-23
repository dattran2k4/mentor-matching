package com.mentormatching.modules.auth.application.port.in;

import com.mentormatching.modules.auth.application.dto.AuthResult;
import com.mentormatching.modules.auth.application.dto.RegisterCommand;

public interface RegisterUseCase {

    AuthResult register(RegisterCommand command);
}
