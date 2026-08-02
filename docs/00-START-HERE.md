# Fleet OS — Codex Start Here

**Handover package:** v1.3.5
**Prepared:** 2026-08-01  
**Audience:** Codex or another engineer taking over implementation  
**Primary repository:** `https://github.com/chriscap/bike-fleet`

## Purpose

This package contains the product, technical, and operational context needed to continue building **Fleet OS**, a local-first web application for managing a personal bike fleet.

The scope is intentionally limited to the software product that has been built. It excludes the earlier bike-buying decision process, equipment-shopping discussion, and trail recommendations that led to some of the seed data.

## Read these documents in order

1. [`01-PRD.md`](01-PRD.md) — product intent, users, requirements, acceptance criteria, and boundaries.
2. [`02-TECHNICAL-SPEC-AND-PLAN.md`](02-TECHNICAL-SPEC-AND-PLAN.md) — current architecture, data model, algorithms, technical debt, testing strategy, and implementation plan.
3. [`03-HANDOVER.md`](03-HANDOVER.md) — operational state, repository and hosting details, release process, known issues, and next tasks.
4. [`04-CODEX-KICKOFF-PROMPT.md`](04-CODEX-KICKOFF-PROMPT.md) — a ready-to-paste prompt for beginning work in Codex.

A copy of the latest generated source is included in [`source-snapshot/`](source-snapshot/).

## Current-state caveat

The latest generated source package is **Fleet OS v1.3.5**. The production deployment status has not been reconfirmed for v1.3.5. Treat the repository and live site as potentially one release behind until verified with:

```bash
git log --oneline -1
npm run release:check
grep "Fleet OS v1.3.5" index.html
grep "fleet-os-v1.3.5" service-worker.js
```

## Non-negotiable product rules

- Preserve the local-storage key `fleet-os-v1-data` unless a deliberate migration is implemented.
- Never overwrite user-entered browser data during a code deployment.
- Preserve unknown values as unknown rather than inferring facts.
- Compatibility results must remain conservative and explain why a result is direct, conditional, unknown, or incompatible.
- Fit guidance is a starting point, not medical advice or a substitute for a professional fit.
- Road/gravel fit coordinates must not be blindly imposed on mountain-bike cockpits.
- Export/backup must remain available before any destructive data or cache operation.
- Every release must update all version and service-worker cache references consistently.

## Recommended first engineering session

1. Check out `main` and confirm the current deployed and repository versions.
2. Run the source locally with a static server.
3. Export a JSON backup from the live site before testing migrations or reset behavior.
4. Run the Playwright smoke-test suite before changing functionality.
5. Run the release-consistency check before and after any version change.
6. Preserve the owner-approved v1.3.4 measurement illustration while adding visual regression coverage.
