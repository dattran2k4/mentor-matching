# Mentor Matching Backend

Mentor Matching backend built with feature-first Clean Architecture.

## Highlights

- Feature-first modular monolith
- Clean Architecture boundaries per module
- Standard API response format
- Global exception handling
- JWT authentication with refresh token cookie
- Swagger / OpenAPI
- CORS configuration by environment variables
- Multi-profile config: `dev`, `test`, `prod`
- MySQL for development/runtime, H2 for tests
- Docker support

## Team Docs

Backend working notes live in [`docs`](./docs/README.md).

Recommended reading order for new members:

1. [`docs/architecture-guide.md`](./docs/architecture-guide.md)
2. [`docs/feature-workflow.md`](./docs/feature-workflow.md)
3. [`docs/database-notes.md`](./docs/database-notes.md)
4. [`docs/team-conventions.md`](./docs/team-conventions.md)

## Project Structure

```text
src/main/java/com/mentormatching
├── MentorMatchingApplication.java
├── modules
│   ├── auth
│   ├── booking
│   ├── catalog
│   ├── health
│   ├── location
│   ├── mentor
│   ├── notification
│   ├── payment
│   ├── review
│   ├── scheduling
│   └── user
└── shared
    ├── config
    ├── exception
    ├── response
    ├── security
    └── validation
```

Typical module structure:

```text
modules/{feature}
├── domain
├── application
│   ├── dto
│   ├── port
│   │   ├── in
│   │   └── out
│   └── service
├── infrastructure
└── presentation
```

## Run Locally

Run from the `backend` folder:

```bash
./mvnw spring-boot:run
```

Or with a profile:

```bash
SPRING_PROFILES_ACTIVE=dev ./mvnw spring-boot:run
SPRING_PROFILES_ACTIVE=test ./mvnw spring-boot:run
SPRING_PROFILES_ACTIVE=prod ./mvnw spring-boot:run
```

## Run Tests

```bash
./mvnw -q test
```

## Swagger

Default URLs:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Main Endpoints

Health:

- `GET /api/v1/health`

Auth:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

User:

- `GET /api/v1/users/me`

Booking:

- `POST /api/v1/bookings`
- `GET /api/v1/bookings/me`

## Docker Compose

```bash
docker compose up --build
```

## Notes

- Database schema is still evolving with the team.
- Flyway should be added after core DBML/business rules are stable enough.
- Until Flyway is enabled, schema-changing PRs should clearly describe DB impact.
