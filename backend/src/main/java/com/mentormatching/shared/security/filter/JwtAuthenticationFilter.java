package com.mentormatching.shared.security.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mentormatching.shared.security.handler.CustomAuthenticationEntryPoint;
import com.mentormatching.shared.security.jwt.JwtTokenProvider;
import com.mentormatching.shared.security.model.AuthenticatedUser;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String AUTH_ERROR_CODE_ATTR = "auth_error_code";
    private static final String AUTH_ERROR_MESSAGE_ATTR = "auth_error_message";

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectProvider<UserDetailsService> userDetailsServiceProvider;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider,
                                   ObjectProvider<UserDetailsService> userDetailsServiceProvider,
                                   CustomAuthenticationEntryPoint authenticationEntryPoint) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsServiceProvider = userDetailsServiceProvider;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader(AUTHORIZATION);

        if (header == null || !header.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(BEARER_PREFIX.length());

        try {
            AuthenticatedUser tokenUser = jwtTokenProvider.parseToken(token);
            UsernamePasswordAuthenticationToken authentication = buildAuthentication(tokenUser);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (ExpiredJwtException ex) {
            commenceAuthenticationError(request, response, "TOKEN_EXPIRED", "JWT token has expired", ex);
            return;
        } catch (MalformedJwtException ex) {
            commenceAuthenticationError(request, response, "TOKEN_MALFORMED", "JWT token is malformed", ex);
            return;
        } catch (UnsupportedJwtException ex) {
            commenceAuthenticationError(request, response, "TOKEN_UNSUPPORTED", "JWT token is unsupported", ex);
            return;
        } catch (SignatureException ex) {
            commenceAuthenticationError(request, response, "TOKEN_SIGNATURE_INVALID", "JWT signature is invalid", ex);
            return;
        } catch (UsernameNotFoundException ex) {
            commenceAuthenticationError(request, response, "USER_NOT_FOUND", "Authenticated user does not exist", ex);
            return;
        } catch (IllegalArgumentException ex) {
            commenceAuthenticationError(request, response, "TOKEN_INVALID", "JWT token is invalid", ex);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken buildAuthentication(AuthenticatedUser tokenUser) {
        UserDetailsService userDetailsService = userDetailsServiceProvider.getIfAvailable();

        if (userDetailsService != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(tokenUser.email());
            return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        }

        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + tokenUser.role());
        return new UsernamePasswordAuthenticationToken(tokenUser, null, List.of(authority));
    }

    /**
     * Gắn thông tin lỗi xác thực vào request để entry point dựng response thống nhất.
     */
    private void setAuthError(HttpServletRequest request, String code, String message) {
        request.setAttribute(AUTH_ERROR_CODE_ATTR, code);
        request.setAttribute(AUTH_ERROR_MESSAGE_ATTR, message);
    }

    private void commenceAuthenticationError(HttpServletRequest request,
                                             HttpServletResponse response,
                                             String code,
                                             String message,
                                             Exception ex) throws IOException, ServletException {
        SecurityContextHolder.clearContext();
        setAuthError(request, code, message);
        authenticationEntryPoint.commence(request, response, new BadCredentialsException(message, ex));
    }
}
