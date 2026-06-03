# Team Conventions

## Branching

Recommended flow:

```text
main       stable branch
develop        integration branch
feat/*     feature branches
fix/*      bug fix branches
chore/*    tooling/docs/refactor branches
```

Open pull requests into `develop` for normal development.

Merge `develop` into `main` only when the team wants a stable release point.

## Commit Scope

Keep commits focused. A feature PR should avoid unrelated formatting or broad refactors.

Good examples:

```text
feat(auth): add refresh token logout
feat(booking): create booking endpoint
feat(payment): handle stripe checkout webhook
chore(docs): add backend context docs
fix(user): map learner profile gender correctly
```

## Pull Request Checklist

Before opening a PR:

- Run `./mvnw -q test` from `backend` when backend code changed.
- Mention new endpoints.
- Mention DB changes, enum changes, or migration impact.
- Mention any assumptions or temporary design choices.
- Add Postman/curl examples when the endpoint is hard to test.

## Code Review Focus

Reviewers should check:

- Domain does not depend on framework annotations.
- Application depends on ports, not infrastructure.
- Controllers are thin.
- DTO mapping is in request/response classes when practical.
- Persistence adapters map JPA entities to domain objects.
- Business validation is not only in request DTOs.
- Schema changes match DBML/Flyway direction.
- Security rules and `@PreAuthorize` match the intended actor.

## Git Tips

Useful commands:

```bash
git status --short --branch
git diff
git diff --cached
git add -p
git restore --staged <file>
git switch <branch>
git switch -c feat/name
git log --oneline --decorate --graph -n 20
```

## When Unsure

If a decision affects schema, module boundaries, authentication, payment, or shared conventions, pause and discuss with
the team before coding too deeply.

Small implementation details can be adjusted in PR review. Schema and architecture drift are harder to undo.
