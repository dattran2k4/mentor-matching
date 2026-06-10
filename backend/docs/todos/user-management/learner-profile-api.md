# Learner Profile API TODO

Branch: `feat/user-learner-profile-api-todo`

## Scope

- Keep `GET /api/v1/users/me/learner-profile` for reading the authenticated learner profile.
- Keep `PUT /api/v1/users/me/learner-profile` for create-or-update behavior.
- Treat learner profile as user-owned data, while grade/catalog lookup remains a catalog concern.

## TODO

- [ ] Confirm whether learners only can access this endpoint or whether parent users can also maintain learner context.
- [ ] Decide how frontend should send grade: free-text label, `gradeId`, or both during the transition from mock data.
- [ ] Align `LearnerProfileResponse` with the profile form fields in `frontend/app/routes/user/profile.tsx`.
- [ ] Add validation for birth year range, school name length, and learning goal length.
- [ ] Add application tests for profile create, profile update, and missing authenticated user.
- [ ] Add controller tests for invalid enum values and malformed payloads.

## Notes

- Avoid putting catalog lookup logic directly in the controller.
- Keep `LearnerProfile` domain free of validation annotations and Spring imports.
- If grade becomes an id, add a catalog lookup port instead of reading catalog persistence directly.
