# Feature Workflow

Use this flow when implementing a backend feature.

## 1. Clarify The Use Case

Identify:

- Actor and role
- Endpoint, if HTTP-facing
- Request data
- Business rules
- Data owned by this module
- Data needed from other modules
- Response shape

If the user only asks for investigation, do not edit files.

## 2. Start With Domain When Business Rules Exist

Create or update domain behavior first when the feature has business meaning.

Examples:

- `Booking.create(...)` validates booking date/time and amount snapshots.
- `Payment.markPaid(...)` validates valid status transition.
- `RefreshToken.issue(...)` validates token expiration.

Domain should not know HTTP, database, or Spring.

## 3. Add Application DTOs And Input Port

Create command/query/result records in `application/dto`.

Create an input port in `application/port/in`.

Examples:

```java
public interface CreateBookingUseCase {
    Long createBooking(CreateBookingCommand command);
}
```

```java
public interface GetMentorsUseCase {
    PageResponse<MentorListItem> getMentors(GetMentorsQuery query);
}
```

## 4. Add Output Ports

If the use case needs persistence or external data, add output ports in `application/port/out`.

Examples:

- `BookingRepositoryPort`
- `PaymentRepositoryPort`
- `BookingUserLookupPort`
- `PaymentCheckoutPort`

Use repository-style names for persistence ports when that is clearer.

## 5. Implement Application Service

Application service should:

- Validate use-case level rules.
- Call lookup ports for data owned by other modules.
- Create or update domain objects.
- Save via repository ports.
- Return result DTO or domain object depending on existing module convention.

## 6. Implement Infrastructure

For persistence:

- Add/update `JpaEntity`.
- Add/update Spring Data `JpaRepository`.
- Add/update mapper.
- Implement output port in adapter.

For external providers:

- Put SDK-specific code in infrastructure.
- Map provider data to application commands or DTOs.

## 7. Add Presentation

Add or update controller, request DTO, and response DTO.

Rules:

- Controller maps request to command/query.
- Controller calls input port.
- Controller returns `ApiResponse` through `ApiResponseFactory`.
- Keep mapping in request/response DTOs when practical.

## 8. Verify

From `backend`:

```bash
./mvnw -q test
```

Also test endpoint manually with Postman/curl when the feature is HTTP-facing.

## 9. Summarize For PR

Mention:

- Endpoint changes
- Use cases added
- Ports/adapters added
- DB/Flyway changes
- Manual test data
- Known limitations
