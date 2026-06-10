# Admin User List API TODO

Branch: `feat/admin-user-list-api-todo`

## Scope

- Add an admin-only endpoint for browsing users, likely `GET /api/v1/admin/users` or `GET /api/v1/users` with admin authorization.
- Support the admin users screen filters: search, role, status, and pagination.
- Return compact user rows, not full account internals.

## TODO

- [ ] Confirm endpoint path and whether admin APIs should live under `/api/v1/admin/*`.
- [ ] Add query DTO with `page`, `size`, `search`, `role`, and `status`.
- [ ] Add an application query use case, for example `GetAdminUsersUseCase`.
- [ ] Add read port method backed by a Spring Data specification or explicit query.
- [ ] Return `PageResponse<AdminUserListItem>` using the shared pagination shape.
- [ ] Protect the endpoint with `hasRole('ADMIN')` and add access tests.
- [ ] Add tests for filtering by role, filtering by status, searching by name/email, and default sorting.

## Notes

- Do not reuse frontend mock names as backend truth without checking enum values.
- Keep status values aligned with `UserStatus`.
- Avoid returning password hash, token state, or sensitive profile fields.
