# Learner Profile Frontend

Branch: `feat/frontend-learner-profile-todo`

## Scope

- Connect `frontend/app/routes/user/profile.tsx` to real current user and learner profile APIs.
- Replace `learnerProfileDraft` as the source of truth when mock mode is disabled.
- Keep the existing dashboard layout and form hierarchy.

## Implemented

- [x] Add `user.api.ts` service methods for `GET /v1/users/me`, `PUT /v1/users/me`, `GET /v1/users/me/learner-profile`, and `PUT /v1/users/me/learner-profile`.
- [x] Add React Query hooks for current user update and learner profile upsert.
- [x] Map backend enum values (`MALE`, `FEMALE`, `OTHER`) to Vietnamese labels in the form.
- [x] Split account fields and learner profile fields into separate payloads because backend keeps two endpoints.
- [x] Add loading, error, and success states.
- [x] Disable save while mutations are pending.
- [x] Keep mock fallback only behind `VITE_USE_MOCK`.

## Next TODO

- [ ] Test `/user/profile` with `VITE_USE_MOCK=false` and backend running on `http://localhost:8080/api/`.
- [ ] Confirm Network shows `GET /v1/users/me` and `GET /v1/users/me/learner-profile` on page load.
- [ ] Confirm Save sends both `PUT /v1/users/me` and `PUT /v1/users/me/learner-profile`.
- [ ] Replace temporary grade id labels with catalog grade data when grade API is ready.
- [ ] Add field-level error display from backend validation responses.
- [ ] Add a clear unsaved-changes state after the user edits a loaded profile.
- [ ] Add automated route/component tests for load, edit, save success, and API error states.

## Notes

- Do not let frontend send email edits unless backend explicitly supports changing email.
- Keep form text compact; this is a dashboard surface, not onboarding copy.
- Reuse existing `Button`, `Input`, `Select`, `Textarea`, and notice components.
