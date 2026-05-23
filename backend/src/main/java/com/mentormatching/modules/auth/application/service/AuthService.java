package com.mentormatching.modules.auth.application.service;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.auth.application.dto.AuthResult;
import com.mentormatching.modules.auth.application.dto.LoginCommand;
import com.mentormatching.modules.auth.application.dto.LogoutCommand;
import com.mentormatching.modules.auth.application.dto.RefreshTokenCommand;
import com.mentormatching.modules.auth.application.dto.RegisterCommand;
import com.mentormatching.modules.auth.application.dto.TokenPair;
import com.mentormatching.modules.auth.application.dto.TokenSubject;
import com.mentormatching.modules.auth.application.port.in.LoginUseCase;
import com.mentormatching.modules.auth.application.port.in.LogoutUseCase;
import com.mentormatching.modules.auth.application.port.in.RefreshTokenUseCase;
import com.mentormatching.modules.auth.application.port.in.RegisterUseCase;
import com.mentormatching.modules.auth.application.port.out.AuthenticationPort;
import com.mentormatching.modules.auth.application.port.out.PasswordEncoderPort;
import com.mentormatching.modules.auth.application.port.out.RefreshTokenRepositoryPort;
import com.mentormatching.modules.auth.application.port.out.TokenProviderPort;
import com.mentormatching.modules.auth.domain.RefreshToken;
import com.mentormatching.modules.user.application.port.out.UserRepositoryPort;
import com.mentormatching.modules.user.domain.User;
import com.mentormatching.shared.exception.AuthenticationFailedException;
import com.mentormatching.shared.exception.InvalidDataException;

@Service
public class AuthService implements LoginUseCase, RegisterUseCase, RefreshTokenUseCase, LogoutUseCase {

    private final AuthenticationPort authenticationPort;
    private final TokenProviderPort tokenProviderPort;
    private final RefreshTokenRepositoryPort refreshTokenRepositoryPort;
    private final PasswordEncoderPort passwordEncoderPort;
    private final UserRepositoryPort userRepositoryPort;

    public AuthService(AuthenticationPort authenticationPort, TokenProviderPort tokenProviderPort,
                       RefreshTokenRepositoryPort refreshTokenRepositoryPort, PasswordEncoderPort passwordEncoderPort,
                       UserRepositoryPort userRepositoryPort) {
        this.authenticationPort = authenticationPort;
        this.tokenProviderPort = tokenProviderPort;
        this.refreshTokenRepositoryPort = refreshTokenRepositoryPort;
        this.passwordEncoderPort = passwordEncoderPort;
        this.userRepositoryPort = userRepositoryPort;
    }

    @Override
    public AuthResult login(LoginCommand command) {
        TokenSubject subject = authenticationPort.authenticate(command.email(), command.password());
        return issueAuthResult(subject);
    }

    @Override
    public AuthResult register(RegisterCommand command) {
        if (!command.password().equals(command.confirmPassword())) {
            throw new InvalidDataException("Password confirmation does not match");
        }

        if (userRepositoryPort.existsByEmail(command.email())) {
            throw new InvalidDataException("Email already exists");
        }

        if (userRepositoryPort.existsByPhone(command.phone())) {
            throw new InvalidDataException("Phone already exists");
        }

        String encodedPassword = passwordEncoderPort.encode(command.password());
        User user = User.register(command.fullName(), command.email(), encodedPassword, command.phone(),
                command.userType());

        User savedUser = userRepositoryPort.save(user);

        TokenSubject subject = new TokenSubject(savedUser.getId(), savedUser.getFullName(), savedUser.getEmail(),
                savedUser.getRole().name());

        return issueAuthResult(subject);
    }

    @Override
    public AuthResult refreshToken(RefreshTokenCommand command) {
        if (command.refreshToken() == null || command.refreshToken().isBlank()) {
            throw new AuthenticationFailedException("Refresh token is required");
        }

        RefreshToken currentRefreshToken = refreshTokenRepositoryPort.findByToken(command.refreshToken())
                .orElseThrow(() -> new AuthenticationFailedException("Refresh token is invalid"));

        if (currentRefreshToken.isRevoked() || currentRefreshToken.isExpired()) {
            throw new AuthenticationFailedException("Refresh token is invalid");
        }

        User user = userRepositoryPort.findById(currentRefreshToken.getUserId())
                .orElseThrow(() -> new AuthenticationFailedException("Refresh token user does not exist"));

        if (!user.canLogin()) {
            throw new AuthenticationFailedException("User cannot login");
        }

        currentRefreshToken.revoke();
        refreshTokenRepositoryPort.revoke(currentRefreshToken);

        TokenSubject subject = new TokenSubject(user.getId(), user.getFullName(), user.getEmail(),
                user.getRole().name());
        return issueAuthResult(subject);
    }

    @Override
    public void logout(LogoutCommand command) {
        if (command.refreshToken() == null || command.refreshToken().isBlank()) {
            return;
        }

        refreshTokenRepositoryPort.findByToken(command.refreshToken())
                .ifPresent(refreshToken -> {
                    refreshToken.revoke();
                    refreshTokenRepositoryPort.revoke(refreshToken);
                });
    }

    private AuthResult issueAuthResult(TokenSubject subject) {
        TokenPair tokenPair = tokenProviderPort.issueTokens(subject);
        RefreshToken refreshToken = RefreshToken.issue(subject.id(), tokenPair.refreshToken(),
                tokenPair.refreshTokenExpiresIn());

        refreshTokenRepositoryPort.save(refreshToken);

        return new AuthResult(
                tokenPair.accessToken(),
                tokenPair.refreshToken(),
                tokenPair.accessTokenExpiresIn(),
                tokenPair.refreshTokenExpiresIn(),
                new AuthResult.UserResult(subject.id(), subject.fullName(), subject.email(), subject.role()));
    }
}
