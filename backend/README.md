# Mentor Matching

Mentor Matching backend built with feature-first Clean Architecture:
- Feature-first Clean Architecture
- Standard API response format
- Global exception handling
- Swagger / OpenAPI
- CORS configuration by environment variables
- Multi-profile config (`dev`, `test`, `prod`)
- Docker + Docker Compose

## 1. Project Structure

```text
src/main/java/com/mentormatching
├── MentorMatchingApplication.java
├── modules
│   ├── auth
│   │   ├── application
│   │   │   ├── dto
│   │   │   ├── port
│   │   │   │   ├── in
│   │   │   │   └── out
│   │   │   └── service
│   │   ├── infrastructure
│   │   └── presentation
│   └── health
│       └── presentation
└── shared
    ├── config
    ├── exception
    ├── response
    └── security
```

## 2. API Response Standards

### Success Response

```json
{
  "status": 200,
  "code": "SUCCESS",
  "success": true,
  "message": "Service is running",
  "data": {
    "status": "UP"
  }
}
```

### Error Response

```json
{
  "code": "RESOURCE_NOT_FOUND",
  "status": 404,
  "message": "Resource not found",
  "path": "/api/v1/example/1",
  "timestamp": "2026-05-16T16:00:00"
}
```

## 3. Environment Configuration

Main config files:
- `src/main/resources/application.yml`
- `src/main/resources/application-dev.yml`
- `src/main/resources/application-test.yml`
- `src/main/resources/application-prod.yml`

Environment variable template:
- `.env.example`

Recommended flow:
1. Copy `.env.example` to `.env`
2. Update values for your environment
3. Run application

## 4. Run Locally

```bash
./mvnw spring-boot:run
```

Or with profile:

```bash
SPRING_PROFILES_ACTIVE=dev ./mvnw spring-boot:run
SPRING_PROFILES_ACTIVE=test ./mvnw spring-boot:run
SPRING_PROFILES_ACTIVE=prod ./mvnw spring-boot:run
```

## 5. Swagger

Default URLs:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## 6. Health Endpoint

- `GET /api/v1/health`

## 7. Auth Endpoints

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`

### Dev test accounts (profile `dev`)

Seeded on startup by `UserDataSeeder`. Password for all accounts: **`123456`**

| Role | Email | Dashboard (frontend) |
|------|-------|----------------------|
| Học viên (LEARNER) | `learner@test.com` | `/user` |
| Mentor | `mentor@test.com` | `/mentor-panel` |
| Admin | `admin@test.com` | `/admin` |

Restart the backend after pulling changes so passwords are reset for these emails.

## 8. Run with Docker Compose

```bash
docker compose up --build
```

## 9. Notes

- Database configuration is available through the active Spring profile and environment variables.
- Add JPA + datasource per project requirements.
