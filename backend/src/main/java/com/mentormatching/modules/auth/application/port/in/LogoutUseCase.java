package com.mentormatching.modules.auth.application.port.in;

import com.mentormatching.modules.auth.application.dto.LogoutCommand;

public interface LogoutUseCase {

    void logout(LogoutCommand command);
}
