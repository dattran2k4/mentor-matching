# Current User API TODO

Branch: `feat/user-current-api-todo`

## Scope

- Keep `GET /api/v1/users/me` as the authenticated account summary endpoint.
- Keep `PUT /api/v1/users/me` as the authenticated account update endpoint.
- Use the existing user module boundaries: presentation maps DTOs, application owns use cases, infrastructure maps persistence.

## TODO

- [ ] Confirm response fields needed by frontend: `id`, `fullName`, `email`, `role`, `userType`, `phone`, `status`.
- [ ] Align `CurrentUserResponse` with the frontend `CurrentUser` type.
- [ ] Validate `UpdateCurrentUserRequest` for required full name and safe phone format.
- [ ] Ensure application service rejects updates for inactive or banned users if that is the intended rule.
- [ ] Add controller/use-case tests for success, unauthenticated access, and invalid request payloads.
- [ ] Add curl/Postman examples for login followed by current user fetch/update.

## Notes

- Do not expose password or refresh token data.
- Keep domain classes framework-free.
- Keep admin-only user management separate from the current authenticated user's own profile.
