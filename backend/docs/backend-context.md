# Backend Context

## Project

Mentor Matching backend is a Spring Boot modular monolith using feature-first Clean Architecture.

## Runtime And Main Stack

- Java 21
- Spring Boot 4.0.6
- Spring WebMVC
- Spring Security
- Spring Data JPA
- Flyway + MySQL
- H2 for tests
- Lombok allowed outside domain
- Stripe Java SDK for payment checkout/webhook integration
- springdoc-openapi for Swagger UI

## Source Layout

```text
backend/src/main/java/com/mentormatching
|-- MentorMatchingApplication.java
|-- modules
|   |-- auth
|   |-- booking
|   |-- catalog
|   |-- location
|   |-- mentor
|   |-- notification
|   |-- payment
|   |-- review
|   |-- scheduling
|   `-- user
`-- shared
    |-- config
    |-- exception
    |-- pagination
    |-- response
    |-- security
    `-- validation
```

## Configuration

Main config files:

- `src/main/resources/application.yml`
- `src/main/resources/application-dev.yml`
- `src/main/resources/application-test.yml`
- `src/main/resources/application-prod.yml`

Important defaults:

- Dev profile connects to MySQL database `mentor-matching` on localhost:3306.
- Test profile uses H2 and disables Flyway.
- Flyway migrations live in `src/main/resources/db/migration`.
- Stripe config is under `app.stripe`.
- JWT access token config is under `app.jwt`.
- Refresh token config is under `app.refresh-token`.

## Current Development Direction

The backend is being built feature-by-feature. Keep module boundaries explicit and prefer CQRS-style query use cases when one module needs to read data owned by another module.

When a feature needs data from another module:

- The owning module exposes a neutral query use case, for example `GetUserSummaryUseCase`.
- The consuming module defines its own lookup port, for example `BookingUserLookupPort`.
- An infrastructure adapter in the consuming module calls the owning module use case and maps data into the consuming module's snapshot DTO.

## Verification

From `backend`:

```bash
./mvnw -q test
```
