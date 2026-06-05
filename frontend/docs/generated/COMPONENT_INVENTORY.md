# Component Inventory

## Inventory Scope

- date: 2026-06-05
- source: current frontend implementation plus framework docs
- purpose: identify what we can reuse now, what needs refactor, and what should be added before broader implementation

## Existing Reusable Components

- component: `DashboardShell`
  status: stable reusable foundation
  notes: correct choice for all role dashboards; should remain the workspace shell

- component: `DashboardPage`
  status: reusable with minor revision
  notes: good page wrapper, but default empty state is too generic for long-term workflow use

- component: `RoleGuard`
  status: stable reusable foundation
  notes: should remain the standard role gate for learner, mentor, and admin route groups

- component: `Navbar`
  status: reusable with content revision
  notes: public navigation is structurally useful, but product language should be realigned

- component: `Footer`
  status: reusable with content revision
  notes: currently includes generic global mentorship messaging that should be adapted to tutoring domain

- component: `SearchBar`
  status: reusable with domain refactor
  notes: should evolve toward subject, grade, mentor, and goal-oriented search rather than generic skill search

- component: `FilterSidebar`
  status: reusable with domain refactor
  notes: strong structural candidate for discover filters; should be tied to real mentor/catalog concepts

- component: `MentorCard`
  status: reusable with domain refactor
  notes: should become the canonical mentor summary card after replacing generic expert fields with tutoring fields

- component: `BookingSidebar`
  status: reusable with workflow refactor
  notes: good shell for booking summary, but must reflect mentor offering, availability, and session semantics

- component: `SectionTitle`
  status: reusable
  notes: suitable for public screens and profile sections; should be used more selectively in dense dashboards

- component: `SubjectCard`
  status: reusable with data refactor
  notes: structure is useful, but dataset should reflect catalog subjects and grades

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

- component: `StatusBadge`
  reason: booking, payment, approval, and verification states need a single display vocabulary
  likely consumers: learner bookings, mentor schedule, mentor dashboard, admin dashboard, admin mentors, earnings

- component: `EmptyState`
  reason: several routes are placeholder or partially supported and need a shared honest pattern
  likely consumers: favorites, messages, reports, settings, empty dashboards

- component: `ScreenErrorState`
  reason: screen-level retry/error handling should be consistent before API integration expands
  likely consumers: discover, mentor profile, bookings, admin lists

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

- component: `MentorTrustBlock`
  reason: verification, approval, highlights, and review proof should have a reusable summary pattern
  likely consumers: mentor profile, admin mentor review

## Components To Avoid Duplicating

- Do not create separate status pills per screen.
- Do not create separate dashboard page wrappers for learner, mentor, and admin without a proven need.
- Do not create another mentor summary card while `MentorCard` can be refactored.
- Do not create route-specific filter sidebars if `FilterSidebar` can be evolved.
- Do not build custom low-level inputs when `app/components/ui` already provides equivalents.
