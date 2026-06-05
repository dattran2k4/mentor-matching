# Component Inventory

## Inventory Scope

- date: 2026-06-05
- source: current frontend implementation plus framework docs
- purpose: identify what we can reuse now, what needs refactor, and what should be added before broader implementation

## Existing Reusable Components

- component: `StatusBadge`
  status: added in Milestone 1
  notes: shared status vocabulary for booking, payment, mentor approval, verification, and user states; currently adopted by learner bookings, mentor cards, mentor profile, and admin mentor review surfaces

- component: `EmptyState`
  status: added in Milestone 1
  notes: shared empty/placeholder state with icon, title, helper copy, and optional action; used by `DashboardPage` default content plus filtered empty states in learner bookings and admin mentor management

- component: `ScreenErrorState`
  status: added in Milestone 1
  notes: shared screen-level error/retry surface built on `EmptyState`; ready for API-backed routes as data integration expands

- component: `DashboardShell`
  status: stable reusable foundation
  notes: correct choice for all role dashboards; should remain the workspace shell

- component: `DashboardPage`
  status: reusable foundation
  notes: good page wrapper; default placeholder now delegates to `EmptyState` so route placeholders share the same state pattern

- component: `DashboardSectionHeader`
  status: added in Milestone 3
  notes: lightweight shared header for learner workspace sections with optional helper copy and right-aligned actions; first used to keep learner dashboard, bookings, favorites, and profile routes focused on composition instead of repeating section chrome

- component: `RoleGuard`
  status: stable reusable foundation
  notes: should remain the standard role gate for learner, mentor, and admin route groups

- component: `Navbar`
  status: reusable with content revision
  notes: public navigation now uses Mentor Matching branding and discovery-first labels; keep it as the shared shell for public routes

- component: `Footer`
  status: reusable with tutoring-domain revision
  notes: footer now reinforces approved mentors, real booking flow, and practical discovery/login entry points instead of generic newsletter-style messaging

- component: `SearchBar`
  status: reusable with milestone 2 refactor
  notes: now supports tutoring-domain helper copy, controlled keyword/context fields, submit handling, and quick-tag shortcuts for home and discover surfaces

- component: `FilterSidebar`
  status: reusable with milestone 2 refactor
  notes: now accepts reusable filter groups plus controlled selected values, and groups tutoring criteria such as subject, grade, meeting type, price, availability, and trust for both desktop and mobile discover flows

- component: `MentorCard`
  status: reusable with milestone 2 refactor
  notes: now emphasizes mentor offerings, expertise fit, trust state, availability hint, and comparison-friendly metadata instead of a soft marketing-card treatment

- component: `BookingSidebar`
  status: reusable with milestone 2 refactor
  notes: now summarizes the selected offering, near-term availability windows, weekly schedule, trust badges, next-step guidance, and a session estimate; later milestones can layer real booking actions on top of this shell

- component: `MentorTrustBlock`
  status: added in Milestone 2
  notes: shared public trust summary for approval status, verification status, highlights, and mentor achievements; first used on mentor profile and intended for future admin mentor review reuse

- component: `SectionTitle`
  status: reusable
  notes: suitable for public screens and profile sections; should be used more selectively in dense dashboards

- component: `SubjectCard`
  status: reusable with milestone 2 refactor
  notes: now presents subject description and grade coverage so the home page can lead users into discovery from tutoring-domain entry points

- component: `RatingStars`
  status: reusable
  notes: keep as a presentational helper, paired with numeric rating and review count

- component: `TestimonialCard`
  status: reusable with copy refactor
  notes: acceptable for public proof sections until real review excerpts replace generic professional stories

## Existing UI Primitives Ready For Use

- component: `ui/button`
  status: stable
  notes: default for actions before building custom button variants

- component: `ui/badge`
  status: stable
  notes: best base for shared status badge system

- component: `ui/table`
  status: stable
  notes: important for admin and earnings/bookings views

- component: `ui/sheet`
  status: stable
  notes: key for mobile filters and mobile detail panels

- component: `ui/dialog`
  status: stable
  notes: useful for confirmations and focused actions

- component: `ui/input`, `ui/select`, `ui/textarea`, `ui/checkbox`, `ui/radio-group`, `ui/switch`
  status: stable
  notes: sufficient form foundation for profile and schedule work

- component: `ui/skeleton`
  status: stable
  notes: should be used for route-level loading shapes

- component: `ui/tooltip`
  status: stable
  notes: useful for icon-only actions and status explanations

## Components Needing Refactor Before Broad Reuse

- component: `MentorCard`
  reason: data shape and copy are tied to the wrong product domain
  likely consumers: home, discover, favorites, future admin/mentor cross-reference views

- component: `BookingSidebar`
  reason: booking model is too simplified for real mentor offering and availability flows
  likely consumers: mentor profile, future booking steps

- component: `SearchBar`
  reason: placeholder and behavior are generic rather than tutoring-specific
  likely consumers: home, discover, maybe future dashboard quick search

- component: `FilterSidebar`
  reason: current filter semantics need to match backend catalog, meeting type, trust, and availability
  likely consumers: discover

- component: `DashboardPage`
  reason: default empty state needs role-aware variants
  likely consumers: most dashboard routes

## Candidate Shared Components To Add

- component: `DashboardSectionHeader`
  reason: role dashboards currently improvise subsection headers and action rows
  likely consumers: learner dashboard, mentor dashboard, admin dashboard

- component: `DataListRow`
  reason: repeated booking, student, user, mentor, and report rows should not each invent their own layout
  likely consumers: learner bookings, mentor students, admin users, admin mentors, reports

- component: `MentorOfferingSelector`
  reason: booking must reflect mentor-specific subject/grade/price offerings
  likely consumers: mentor profile, future booking flow

- component: `AvailabilityPicker`
  reason: mentor schedule and booking need a shared mental model for time windows
  likely consumers: mentor schedule, mentor profile booking section

## Components To Avoid Duplicating

- Do not create separate status pills per screen.
- Do not create separate dashboard page wrappers for learner, mentor, and admin without a proven need.
- Do not create another mentor summary card while `MentorCard` can be refactored.
- Do not create route-specific filter sidebars if `FilterSidebar` can be evolved.
- Do not build custom low-level inputs when `app/components/ui` already provides equivalents.
