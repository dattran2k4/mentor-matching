# Admin Users Frontend TODO

Branch: `feat/frontend-admin-users-todo`

## Scope

- Connect `frontend/app/routes/admin/users.tsx` to real admin user management APIs.
- Preserve the existing operational table/card layout.
- Keep destructive account actions gated behind backend support and confirmation UI.

## TODO

- [ ] Add `admin-users.api.ts` with a paginated list method and a status-change method.
- [ ] Add React Query hooks for admin user list and user status mutation.
- [ ] Move search, role filter, status filter, page, and size into URL query params.
- [ ] Replace `adminUsers` mock with API data when `VITE_USE_MOCK` is false.
- [ ] Add loading skeletons for desktop table and mobile cards.
- [ ] Add empty/error states that preserve selected filters.
- [ ] Add row actions only after status API is available: inspect, deactivate, reactivate.
- [ ] Add confirmation dialog for status changes with an admin note field.

## Notes

- Do not expose role-changing UI until backend has a dedicated role-change use case.
- Keep status labels mapped from backend enums instead of hard-coding mock-only values.
- Admin screens should stay dense and scan-friendly; avoid marketing-style explanatory sections.
