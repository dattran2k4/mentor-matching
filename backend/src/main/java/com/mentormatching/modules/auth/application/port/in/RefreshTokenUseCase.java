package com.mentormatching.modules.auth.application.port.in;

import com.mentormatching.modules.auth.application.dto.AuthResult;
import com.mentormatching.modules.auth.application.dto.RefreshTokenCommand;

public interface RefreshTokenUseCase {

    AuthResult refreshToken(RefreshTokenCommand command);
}
