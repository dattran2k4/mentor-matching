# Decisions Log

## Decision 1: `frontend/docs` remains the active documentation root

- date: 2026-06-05
- context: the planning request referenced `docs/...`, but the repository currently stores framework and generated planning documents under `frontend/docs/...`
- decision: continue using `frontend/docs/...` as the active path for this implementation cycle
- rationale: it matches the repository structure already created and keeps frontend planning close to the frontend codebase
- alternatives considered: moving docs to root-level `docs/` immediately
- follow-up: if the team wants root-level docs later, do it as a separate documentation move rather than mixing it into UI planning

## Decision 2: backend domain truth overrides generic frontend mock content

- date: 2026-06-05
- context: current public mock constants and some route copy describe a broad professional mentor marketplace, while backend schema and framework docs define an education/tutoring platform
- decision: treat backend docs, migrations, and framework docs as the stronger product truth for all upcoming frontend work
- rationale: public copy and mock content can change easily; domain structure and business rules already exist in backend and framework documentation
- alternatives considered: preserving the current generic mentor marketplace direction
- follow-up: public copy and mock datasets should be aligned early in the next implementation cycle

## Decision 3: implementation proceeds in dependency order

- date: 2026-06-05
- context: many routes exist already, but shared states and domain-aligned display models are not yet standardized
- decision: implement foundation before route rewrites, and static UI before data integration
- rationale: this reduces rework and gives later API integration a stable UI target
- alternatives considered: integrating route data immediately screen by screen
- follow-up: the first coding milestone should create shared status, empty, error, and view-model patterns

## Decision 4: public marketplace and learner booking flow are the first high-value surfaces

- date: 2026-06-05
- context: the public route group and learner booking flow represent the clearest user-value path and the strongest product story
- decision: prioritize home, discover, mentor profile, and learner bookings before deeper admin or secondary dashboard polishing
- rationale: these surfaces define the product narrative and the main conversion path
- alternatives considered: starting with admin routes or low-value placeholder pages
- follow-up: milestone sequencing in `IMPLEMENTATION_PLAN.md` and `TASK_BREAKDOWN.md` reflects this order

## Decision 5: unsupported screens should stay honest

- date: 2026-06-05
- context: favorites, messages, reports, and settings do not yet have clear full backend support
- decision: allow these routes to remain partial, but structure them consistently and avoid implying backend capabilities that do not exist
- rationale: this keeps the UI credible while still supporting route completeness and navigation continuity
- alternatives considered: hiding these routes entirely or building misleading fake-complete experiences
- follow-up: these routes should use shared empty/error states and explicit placeholder framing where needed

## Decision 6: MVP wireframes prioritize structure over visual novelty

- date: 2026-06-05
- context: the framework requires practical implementation-ready UX, while the current frontend still contains showcase-style surfaces in some routes
- decision: define text wireframes around implementation-friendly blocks such as headers, cards, lists, tables, summary rows, and sheets
- rationale: this gives the team a stable bridge from planning to React implementation without inventing a visual system that conflicts with the design system
- alternatives considered: creating more editorial or highly visual screen compositions at the planning stage
- follow-up: visual refinement should happen inside the shared design system boundaries after the static structure is implemented

## Decision 7: booking and trust information must stay visible early in the hierarchy

- date: 2026-06-05
- context: mentor selection depends on subject fit, price, availability, approval, and reviews, not just profile storytelling
- decision: mentor profile, discover, and booking-related screens will place offering, trust, and action information near the top of the layout hierarchy
- rationale: this supports fast comparison and reduces the risk of building beautiful but low-utility detail pages
- alternatives considered: leading with long-form profile storytelling or heavily decorative hero sections
- follow-up: public marketplace refactors should preserve this hierarchy even if copy and styling evolve

## Decision 8: complex screens are split into MVP sections before richer interactions

- date: 2026-06-05
- context: schedule, booking, mentor review, messages, and settings can become interaction-heavy quickly
- decision: define MVP layouts in discrete sections first, then expand into richer interactions after static UI and shared components are stable
- rationale: this matches the implementation plan rule of foundation first and static UI before integration
- alternatives considered: designing full-complexity interactive workflows before foundational components are ready
- follow-up: schedule and admin review routes should start with clear list/summary/sheet structures before introducing advanced interaction patterns
