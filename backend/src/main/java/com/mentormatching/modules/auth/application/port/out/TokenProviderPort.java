package com.mentormatching.modules.auth.application.port.out;

import com.mentormatching.modules.auth.application.dto.TokenPair;
import com.mentormatching.modules.auth.application.dto.TokenSubject;

public interface TokenProviderPort {

    TokenPair issueTokens(TokenSubject subject);
}
