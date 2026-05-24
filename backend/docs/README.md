# Backend Team Docs

This folder contains short working notes for backend members. The goal is not to write perfect theory, but to keep the team aligned while the project is still evolving.

## Start Here

1. Read [Architecture Guide](./architecture-guide.md) before creating or changing a module.
2. Read [Feature Workflow](./feature-workflow.md) before implementing a new endpoint/use case.
3. Read [Database Notes](./database-notes.md) before changing DBML, JPA entities, or future Flyway migrations.
4. Read [Team Conventions](./team-conventions.md) before opening a pull request.

## Current Direction

The backend follows a feature-first modular monolith with Clean Architecture boundaries:

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

Shared technical concerns live in `shared`, for example response, exception, security, validation, and config.

## Important Reminder

The database schema is still being discussed by the team. Avoid adding official Flyway migrations until core tables and enum values are more stable.
