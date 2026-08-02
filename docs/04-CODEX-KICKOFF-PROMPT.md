# Codex Kickoff Prompt — Fleet OS

Use the following prompt in Codex after opening the `chriscap/bike-fleet` repository.

---

You are taking over development of **Fleet OS**, a static local-first progressive web app for managing a personal bike fleet.

First read these repository documents in order:

1. `docs/00-START-HERE.md`
2. `docs/01-PRD.md`
3. `docs/02-TECHNICAL-SPEC-AND-PLAN.md`
4. `docs/03-HANDOVER.md`
5. `docs/agents/README.md`
6. `docs/agents/BIKE-DOMAIN-EXPERT.md` when work touches bike specifications, technology, compatibility, geometry, fit, measurement definitions, illustrations, or seed data

Then inspect the current source and Git history. Do not assume production is on the same version as the repository; verify it.

## Product constraints

- Preserve the `fleet-os-v1-data` local-storage key unless implementing a tested migration.
- Never clear or overwrite user data as part of a normal deployment.
- Preserve unknown values rather than inferring unsupported facts.
- Keep compatibility conservative and criterion-based.
- Fit guidance is not medical advice.
- Do not copy road/gravel cockpit coordinates directly to mountain bikes.
- Keep JSON export available before destructive actions.
- Preserve the owner-approved v1.3.4 measurement illustration and its named anchors.

## First assignment

Create a focused pull request titled:

`Add baseline tests and release-version tooling`

The PR should:

1. Add a minimal Node development toolchain without changing production architecture.
2. Add Playwright smoke tests for:
   - Home
   - Fleet/Bikes
   - Fleet/Wheelsets
   - Fleet/Geometry & Fit
   - Every measurement-guide option
   - Workshop/Inventory
   - Workshop/Compatibility
   - Workshop/Maintenance
   - Ride
   - More
3. Add a persistence test proving a bike edit survives reload.
4. Add a migration fixture test proving older data is preserved.
5. Add a release script that updates every duplicated version reference.
6. Fix stale strings referring to the v1.1 wheelset override limitation and v1.2 reset database.
7. Update README/changelog so the current release history is accurate.
8. Avoid broad refactoring in this PR.

Use `fleet_bike_domain_expert` as a read-only reviewer whenever a change depends on bicycle-industry facts, model-year specifications, component interfaces, geometry or fit definitions, measurement anchors, or compatibility conclusions.

Before editing, report:

- Current branch and latest commit
- Current `APP_VERSION`
- Version in `index.html`
- Service-worker cache version
- Whether tests or a package file already exist
- Any discrepancies between documentation and code

After implementation, report:

- Files changed
- Test commands and results
- Any migration or data-risk considerations
- A recommended second PR
