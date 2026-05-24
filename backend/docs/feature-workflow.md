# Feature Workflow

Use this checklist when implementing a new feature.

## 1. Start From Domain

Define or update the domain model first when business rules are important.

Examples:
- Booking date/time must be valid.
- Refresh token must not be expired or revoked.
- Notification can be marked as read.

Keep framework annotations out of domain classes.

## 2. Add Application Use Case

Create an input port in `application/port/in`.

Example:

```java
public interface CreateBookingUseCase {
    Long createBooking(CreateBookingCommand command);
}
```

Create command/result DTOs in `application/dto` when needed.

## 3. Add Output Ports

If the use case needs persistence or another technical dependency, add a port in `application/port/out`.

Example:

```java
public interface BookingRepositoryPort {
    Booking save(Booking booking);
}
```

Application services should depend on ports, not infrastructure classes.

## 4. Implement Application Service

The service coordinates the use case:

- Convert command to domain object.
- Call domain behavior.
- Use output ports.
- Return result.

Avoid putting HTTP request/response logic here.

## 5. Add Infrastructure Adapter

Implement output ports under `infrastructure`.

For persistence:

```text
XxxJpaEntity
XxxJpaRepository
XxxPersistenceMapper
XxxPersistenceAdapter
```

Mapper converts between JPA entity and domain object.

## 6. Add Presentation Endpoint

Create controller and request/response DTOs.

Request DTO should map to application command.

Response DTO should own response mapping when practical, for example:

```java
public static BookingResponse from(Booking booking) {
    ...
}
```

## 7. Validate

Use request validation for simple input shape:

- Required fields
- String length
- Enum format
- Basic numeric ranges

Use domain validation for business invariants:

- Booking time must be after now.
- End time must be after start time.
- Price must be positive.

## 8. Test Before PR

Run from backend folder:

```bash
./mvnw -q test
```

If DB schema changed, mention it clearly in the PR.
