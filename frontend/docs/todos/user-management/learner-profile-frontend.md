# Learner Profile Frontend TODO

Branch: `feat/frontend-learner-profile-todo`

## Scope

- Connect `frontend/app/routes/user/profile.tsx` to real current user and learner profile APIs.
- Replace `learnerProfileDraft` as the source of truth once backend fields are stable.
- Keep the existing dashboard layout and form hierarchy.

## TODO

- [ ] Add `user.api.ts` service methods for `GET /v1/users/me`, `PUT /v1/users/me`, `GET /v1/users/me/learner-profile`, and `PUT /v1/users/me/learner-profile`.
- [ ] Add React Query hooks for current user update and learner profile upsert.
- [ ] Map backend enum values (`MALE`, `FEMALE`, `OTHER`) to Vietnamese labels in the form.
- [ ] Split account fields and learner profile fields into separate payloads if backend keeps two endpoints.
- [ ] Add loading, error, empty profile, dirty form, and success states.
- [ ] Disable save while mutations are pending and show validation messages near fields.
- [ ] Keep mock fallback only behind `VITE_USE_MOCK`.

## Notes

- Do not let frontend send email edits unless backend explicitly supports changing email.
- Keep form text compact; this is a dashboard surface, not onboarding copy.
- Reuse existing `Button`, `Input`, `Select`, `Textarea`, and notice components.
