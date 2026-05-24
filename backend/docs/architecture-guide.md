# Architecture Guide

## Style

This project uses a feature-first modular monolith with Clean Architecture.

Each business module owns its own domain, application, infrastructure, and presentation code. Examples: `auth`, `user`, `mentor`, `catalog`, `booking`, `payment`, `notification`.

## Module Structure

```text
modules/{module-name}
├── domain
├── application
│   ├── dto
│   ├── port
│   │   ├── in
│   │   └── out
│   └── service
├── infrastructure
│   └── persistence
│       ├── entity
│       ├── mapper
│       └── repository
└── presentation
    └── dto
        ├── request
        └── response
```

## Dependency Direction

Dependencies should point inward:

```text
presentation -> application -> domain
infrastructure -> application/domain
```

The domain layer must not depend on Spring, JPA, Lombok, validation annotations, HTTP classes, or persistence entities.

## Domain Layer

Domain classes should represent business concepts and rules.

Allowed:
- Plain Java classes
- Enums
- Java standard library types
- Business validation and behavior

Avoid:
- `@Entity`
- `@Component`
- `@Service`
- `@Getter`, `@Builder`, or other Lombok annotations
- Request/response DTOs
- JPA repositories

## Application Layer

Application coordinates use cases.

Typical content:
- Commands and results
- Input ports, for example `CreateBookingUseCase`
- Output ports, for example `BookingRepositoryPort`
- Application services implementing use cases

Application should work with domain objects, not JPA entities.

## Ports

Use `port/in` for use cases called by presentation.

Examples:
- `LoginUseCase`
- `CreateBookingUseCase`
- `GetMyBookingsUseCase`

Use `port/out` for dependencies needed by application.

Examples:
- `UserRepositoryPort`
- `BookingRepositoryPort`
- `NotificationRepositoryPort`
- `TokenProviderPort`

For persistence ports, prefer names ending with `RepositoryPort` so the team can read them easily.

## Infrastructure Layer

Infrastructure implements output ports.

Typical classes:
- `XxxJpaEntity`
- `XxxJpaRepository`
- `XxxPersistenceMapper`
- `XxxPersistenceAdapter`

JPA entities may use Lombok and JPA annotations. They should not leak into application or domain.

## Presentation Layer

Presentation owns HTTP details.

Typical classes:
- `XxxController`
- Request DTOs
- Response DTOs

Request DTOs should map to application commands. Response DTOs should map from application results or domain read models.

Controllers should stay thin: validate request, call use case, return response.

## Shared Package

Use `shared` only for cross-cutting technical concerns:

- `response`
- `exception`
- `security`
- `validation`
- `config`

Do not put business logic into `shared` just because many modules may use it.
