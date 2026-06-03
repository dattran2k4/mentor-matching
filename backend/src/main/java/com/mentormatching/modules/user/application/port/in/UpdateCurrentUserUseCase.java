package com.mentormatching.modules.user.application.port.in;

import com.mentormatching.modules.user.application.dto.CurrentUserDetails;
import com.mentormatching.modules.user.application.dto.UpdateCurrentUserCommand;

public interface UpdateCurrentUserUseCase {

    CurrentUserDetails updateCurrentUser(UpdateCurrentUserCommand command);
}
