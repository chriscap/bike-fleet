# Fleet OS — Codex project instructions

## Mission

Continue building Fleet OS as a trustworthy, local-first bike-fleet PWA. Treat the repository—not prior chat history—as the source of truth.

## Required context

Before substantial work, read:

1. `docs/00-START-HERE.md`
2. `docs/01-PRD.md` for product behavior, scope, and acceptance criteria
3. `docs/02-TECHNICAL-SPEC-AND-PLAN.md` for architecture, data model, algorithms, risks, and sequencing
4. `docs/03-HANDOVER.md` for repository, deployment, release history, and operational cautions
5. `docs/agents/README.md` when delegating to custom agents

Read only the documents relevant to the current task after the initial orientation. Do not invent requirements that are absent from the PRD or current code.

## Non-negotiable constraints

- Preserve the local-storage key `fleet-os-v1-data` unless a deliberate, backward-compatible migration is implemented and tested.
- Never overwrite or reset user browser data during a normal code deployment.
- Keep unknown values unknown. Do not infer geometry, component standards, compatibility, or fit facts without a recorded source.
- Compatibility logic must be conservative and explain why a result is direct, conditional, unknown, emergency-only, or incompatible.
- Fit guidance is a setup aid, not medical advice. Do not directly impose road/gravel cockpit coordinates on mountain bikes.
- Preserve JSON export and safe import before any destructive data or cache operation.
- Do not commit live JSON backups, raw Retül PDFs, personal contact data, credentials, or unsanitized private fixtures.
- Do not add a framework, build system, production dependency, cloud database, or synchronization service without explicit product-owner approval.
- Do not deploy to DreamHost, push to `main`, delete data, or rewrite Git history unless explicitly asked.

## Engineering approach

- Prefer small, reviewable changes over broad rewrites.
- Inspect the current implementation before proposing architecture changes.
- Preserve static-host compatibility unless a requirement explicitly changes it.
- Separate manufacturer geometry, measured bike fit, and rider baseline data.
- Treat service-worker and cache behavior as release-critical.
- Keep desktop, mobile, keyboard, and offline behavior in scope for UI changes.
- Update documentation when behavior, data shape, deployment, or release steps change.

## Start-of-task protocol

1. Run `git status` and identify the branch and working-tree state.
2. Read the relevant product and technical sections.
3. State the acceptance criteria and files likely to change.
4. For risky work, use read-only agents first to map the code and risks.
5. Do not start concurrent write agents on overlapping files.

## Validation expectations

For JavaScript changes, at minimum run:

```bash
node --check assets/app.js
```

Run the app through a local static server:

```bash
python3 -m http.server 8000
```

When the automated test harness exists, run all applicable tests. For changes touching persistence, migration, import/export, routing, service workers, or fit/geometry calculations, add or update regression coverage.

Before a release, verify every version reference is synchronized across the application, service worker, asset URLs, footer, README, and changelog. Confirm the app loads from a clean/private browser session and preserves existing local data.

## Custom-agent delegation

Project-scoped agents live in `.codex/agents/`:

- `fleet_product_guardian`: product scope, acceptance criteria, UX consistency; read-only
- `fleet_architect`: architecture, data model, migration, sequencing, and risk; read-only
- `fleet_bike_domain_expert`: bicycle industry standards, component technology, geometry, compatibility evidence, measurement definitions, and discipline-aware fitting; read-only
- `fleet_ui_engineer`: HTML/CSS/interaction/accessibility/measurement visuals; write-capable
- `fleet_data_engineer`: local storage, migrations, import/export, compatibility, release tooling; write-capable
- `fleet_test_engineer`: test harness, regression coverage, fixtures, and release checks; write-capable
- `fleet_reviewer`: final correctness, data-safety, cache, accessibility, and documentation review; read-only

Parallelize independent read-only analysis. For work involving bike specifications, compatibility, geometry, fit guidance, measurement diagrams, or seed data, include `fleet_bike_domain_expert` before implementation. Use only one write-capable agent per overlapping file area. The main thread owns requirements, conflict resolution, integration, and the final summary.

## Definition of done

A task is done only when:

- The implemented behavior matches documented acceptance criteria.
- Existing local data remains readable and preserved.
- Relevant tests and manual checks pass.
- No unrelated files are changed.
- Version and cache references are consistent when the release version changes.
- Documentation and changelog entries reflect externally visible changes.
- Remaining risks, unverified assumptions, and manual checks are explicitly listed.
