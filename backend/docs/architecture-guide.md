# Architecture Guide

## Style

The backend uses a feature-first modular monolith with Clean Architecture boundaries.

Each business module owns its own domain, application, infrastructure, and presentation code.

```text
modules/{module}
|-- domain
|-- application
|   |-- dto
|   |-- port
|   |   |-- in
|   |   `-- out
|   `-- service
|-- infrastructure
`-- presentation
```

## Dependency Direction

Allowed direction:

```text
presentation -> application -> domain
infrastructure -> application/domain
```

Do not make domain depend on application, infrastructure, presentation, or shared framework helpers.

## Domain Layer

Domain contains business state and behavior.

Allowed:

- Plain Java classes
- Enums
- Java standard library types
- Business validation and behavior
- Factory methods such as `create`, `issue`, or `restore`

Avoid:

- Spring annotations
- JPA annotations
- Lombok annotations
- Bean validation annotations
- HTTP/request/response DTOs
- Persistence entities or repositories

## Application Layer

Application coordinates use cases and owns ports.

Typical content:

- Commands, results, and summary DTOs
- Input ports in `application/port/in`
- Output ports in `application/port/out`
- Application services implementing use cases

Application should work with domain objects and application DTOs, not JPA entities.

Spring annotations such as `@Service` and `@Transactional` are currently accepted in application services for pragmatic MVP speed.

## Infrastructure Layer

Infrastructure implements output ports and technical integrations.

Persistence structure usually looks like:

```text
infrastructure/persistence
|-- entity
|-- mapper
|-- repository
`-- XxxPersistenceAdapter.java
```

Rules:

- JPA entities stay in infrastructure.
- Spring Data repositories stay in infrastructure.
- Persistence mappers convert JPA entities to domain objects and back.
- External providers such as Stripe belong in infrastructure.

## Presentation Layer

Presentation exposes HTTP endpoints.

Rules:

- Controllers should be thin.
- Request DTOs map to application commands.
- Response DTOs own response mapping when practical.
- Use `ApiResponseFactory` and shared response wrappers.
- Use `@PreAuthorize` for endpoint authorization.

## Shared Layer

Shared is for technical cross-cutting concerns only.

Current shared areas:

- `shared/response`
- `shared/exception`
- `shared/security`
- `shared/pagination`
- `shared/validation`
- `shared/config`

Do not put business domain logic in shared just because multiple modules need it.

## Module Boundary Rule

If module A needs data from module B:

- Prefer a neutral query use case in module B.
- Module A defines its own lookup port.
- Module A infrastructure adapter calls module B use case and maps the result.

This keeps module A from depending directly on module B repositories or JPA entities.
