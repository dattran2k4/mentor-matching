# Mentor Matching Agent Guide

This file is the first context file for Codex or any coding agent working in this repository.
Keep it short. Detailed backend context lives in `backend/docs`.

## Repository Layout

```text
Mentor-Matching/
|-- backend/     Spring Boot backend
|-- frontend/    Frontend app, docs will be added later
|-- .github/     GitHub workflows and repository automation
`-- AGENTS.md    Root agent guide
```

## How To Start A New Backend Thread

When starting a new Codex thread for backend work, ask Codex to read:

1. `AGENTS.md`
2. `backend/docs/backend-context.md`
3. The most relevant focused doc, for example:
   - `backend/docs/architecture-guide.md` for module structure and Clean Architecture rules
   - `backend/docs/feature-workflow.md` for implementing a feature
   - `backend/docs/database-notes.md` for schema, Flyway, DBML, and enum decisions
   - `backend/docs/module-map.md` for existing modules and current feature status
   - `backend/docs/payment-stripe.md` for Stripe/payment context
   - `backend/docs/team-conventions.md` for Git, PR, and team conventions

## Backend Rules For Agents

- Preserve feature-first Clean Architecture.
- Domain must stay framework-free: no Spring, JPA, Lombok, HTTP, or validation annotations.
- Application owns use cases and ports.
- Infrastructure implements output ports and maps JPA entities to domain objects.
- Presentation stays thin and maps request/response DTOs.
- Shared technical concerns live under `backend/src/main/java/com/mentormatching/shared`.
- Do not change files when the user only asks for analysis, explanation, or root-cause investigation.
- Before editing, inspect the relevant files and explain the intended edit briefly.
- After backend code changes, prefer running `./mvnw -q test` from `backend` when feasible.

## Frontend Notes

Frontend docs are intentionally not defined yet. When frontend work starts, add docs under `frontend/docs` and link them from this file.
