# Database Notes

## Current State

The project now uses Flyway migrations under:

```text
backend/src/main/resources/db/migration
```

Current migration pattern:

- `V1__create_initial_schema.sql` creates the base schema.
- Later migrations seed base/demo data or evolve tables.
- Test profile disables Flyway and uses H2 `ddl-auto=create-drop`.

## Flyway Rules

- Do not edit a migration that has already been applied by teammates unless the team explicitly agrees to reset dev databases.
- Add a new `V{n}__description.sql` for schema changes after shared migrations exist.
- Keep migration names clear and lowercase with underscores.
- Application migrations should not create the database itself. The database should be created by Docker/init script/DBA/local setup.
- Prefer table-level charset/collation if the team wants schema portability across inconsistent MySQL defaults.

## Enum Style

Java uses `@Enumerated(EnumType.STRING)`, so DB values should match Java enum names.

Use uppercase values:

```text
PENDING
CONFIRMED
COMPLETED
```

Avoid lowercase values unless Java enum mapping is intentionally changed.

## Current Main Tables

Core groups:

- Auth: `auth_refresh_tokens`
- User: `users`, `learner_profiles`
- Location: `cities`, `districts`
- Catalog: `categories`, `subjects`, `grades`, `subject_grades`
- Mentor: `mentor_profiles`, `mentor_verifications`, `mentor_subjects`, achievements, traits, highlights
- Scheduling: `mentor_availabilities`
- Booking: `bookings`
- Payment: `payments`
- Review: `reviews`, review tags/options
- Notification: `notifications`

## Snapshot Data

Bookings store historical snapshots because booking is a transaction record.

Booking snapshot examples:

- `student_name`
- `mentor_name`
- `subject_name`
- `grade_name`
- `price_per_hour`
- `total_amount`
- `start_time`
- `end_time`

Do not rely on live profile/catalog data to reconstruct old booking price or names.

## Availability Direction

The project moved away from fixed `time_slots`.

Current direction:

```text
mentor_availabilities
- mentor_id
- availability_type: RECURRING or SPECIFIC_DATE
- day_of_week, used for RECURRING
- available_date, used for SPECIFIC_DATE
- start_time
- end_time
- created_at
- updated_at
```

Booking stores actual booked time:

```text
booking_date
start_time
end_time
```

Booking does not need `time_slot_id`.

## Payment Provider Tracking

Payments include provider tracking fields for Stripe and future providers:

- `provider_reference_id`: Stripe Checkout Session id for Stripe Checkout
- `provider_transaction_id`: Stripe PaymentIntent id after successful payment
- `checkout_url`
- `expires_at`
- `failure_reason`

Future providers may map these fields differently, but keep names provider-neutral.
