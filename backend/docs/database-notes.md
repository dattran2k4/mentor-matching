# Database Notes

## Current Status

The database schema is still being aligned with the team. Do not treat current tables as final until the DBML and business rules are reviewed.

Important areas still under discussion:

- Flexible mentor availability instead of fixed time slots
- Booking price snapshot and total amount calculation
- Free trial sessions or discounted first sessions
- Payment flow and provider integration
- Notification API and delivery strategy
- Future Flyway migration baseline

## Enum Style

Java uses `@Enumerated(EnumType.STRING)`, so DB enum values should use uppercase names.

Good:

```text
PENDING
CONFIRMED
COMPLETED
```

Avoid:

```text
pending
confirmed
completed
```

This keeps DBML, Java enums, and API values consistent.

## Snapshot Data

Some modules should store denormalized snapshot fields.

Booking should store snapshot fields because it represents a historical transaction:

- `student_name`
- `mentor_name`
- `subject_name`
- `grade_name`
- `price_per_hour`
- `total_amount`
- `start_time`
- `end_time`

Profile tables usually should not store snapshot names unless there is a clear query/performance reason.

Example: `learner_profiles` can keep only `grade_id`, and the API can enrich `grade.name` from catalog when needed.

## Flexible Availability Direction

Prefer flexible availability windows over fixed time slots.

Recommended direction:

```text
mentor_availabilities
- mentor_id
- availability_type: RECURRING or SPECIFIC_DATE
- day_of_week, used for RECURRING
- available_date, used for SPECIFIC_DATE
- start_time
- end_time
- is_active
```

Booking should store actual booked time:

```text
booking_date
start_time
end_time
mentor_availability_id
```

This allows bookings like `05:30-07:00` or `18:15-19:45` if business rules allow it.

## Flyway Timing

Do not create official Flyway migrations while core schema is still moving quickly.

Add Flyway when:

- DBML is stable enough for team development.
- Main enum values are agreed.
- Booking/payment pricing rules are agreed.
- Mentor availability model is agreed.
- Team needs repeatable schema setup across machines.

For Spring Boot 4 with MySQL, expected dependencies are:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-flyway</artifactId>
</dependency>

<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-mysql</artifactId>
</dependency>
```

Until Flyway is enabled, development may continue with Hibernate `ddl-auto=update`, but schema-changing PRs must describe the DB impact clearly.
