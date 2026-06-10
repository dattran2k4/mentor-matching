# Admin User Status API TODO

Branch: `feat/admin-user-status-api-todo`

## Scope

- Add an admin-only operation for changing user status, likely `PATCH /api/v1/admin/users/{userId}/status`.
- Support operational states from `UserStatus`: `ACTIVE`, `INACTIVE`, and future lock/suspend semantics if needed.
- Keep role changes out of this feature unless the team explicitly scopes them in.

## TODO

- [ ] Confirm allowed status transitions and whether `BANNED` should exist in backend or remain a frontend label.
- [ ] Add request DTO with target status and required reason/note.
- [ ] Add use case such as `ChangeUserStatusUseCase`.
- [ ] Add domain behavior for valid status transitions instead of mutating JPA state directly.
- [ ] Prevent an admin from disabling their own active admin account.
- [ ] Decide whether disabling a user should revoke refresh tokens immediately.
- [ ] Add tests for valid transition, invalid transition, non-admin access, missing user, and self-disable prevention.

## Notes

- Keep audit/history requirements visible before implementation; status changes affect trust and support workflows.
- If token revocation is required, coordinate with the auth module through an application port.
- Frontend should not expose destructive actions until this endpoint and confirmation flow are ready.
