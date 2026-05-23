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
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

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

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider,
                                   ObjectProvider<UserDetailsService> userDetailsServiceProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsServiceProvider = userDetailsServiceProvider;
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
            SecurityContextHolder.clearContext();
            setAuthError(request, "TOKEN_EXPIRED", "JWT token has expired");
            throw new BadCredentialsException("JWT token has expired", ex);
        } catch (MalformedJwtException ex) {
            SecurityContextHolder.clearContext();
            setAuthError(request, "TOKEN_MALFORMED", "JWT token is malformed");
            throw new BadCredentialsException("JWT token is malformed", ex);
        } catch (UnsupportedJwtException ex) {
            SecurityContextHolder.clearContext();
            setAuthError(request, "TOKEN_UNSUPPORTED", "JWT token is unsupported");
            throw new BadCredentialsException("JWT token is unsupported", ex);
        } catch (SignatureException ex) {
            SecurityContextHolder.clearContext();
            setAuthError(request, "TOKEN_SIGNATURE_INVALID", "JWT signature is invalid");
            throw new BadCredentialsException("JWT signature is invalid", ex);
        } catch (UsernameNotFoundException ex) {
            SecurityContextHolder.clearContext();
            setAuthError(request, "USER_NOT_FOUND", "Authenticated user does not exist");
            throw new BadCredentialsException("Authenticated user does not exist", ex);
        } catch (IllegalArgumentException ex) {
            SecurityContextHolder.clearContext();
            setAuthError(request, "TOKEN_INVALID", "JWT token is invalid");
            throw new BadCredentialsException("JWT token is invalid", ex);
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
}
