# Fleet OS Engineering Handover

**Latest generated release:** v1.3.5
**Production status:** Not reconfirmed for v1.3.5
**Repository:** `https://github.com/chriscap/bike-fleet`  
**Live URL:** `https://www.chriscap.com/bike-fleet/`  
**Hosting:** DreamHost shared server

---

## 1. Executive summary

Fleet OS is a functioning static progressive web app for managing a personal bike fleet. It began as a fleet, parts, compatibility, ride, and maintenance tool and has expanded to include geometry comparison, a Retül-informed fit advisor, and measurement diagrams.

The current implementation is intentionally lightweight: no framework, no server, and no build process. This made initial delivery fast and DreamHost deployment simple, but the application is now large enough that test coverage, modularization, schema validation, and release automation should precede significant additional features.

The latest generated code is v1.3.5. It preserves the accepted generic bicycle direction while aligning fit terminology with the owner’s April 2022 Retül road report, preserving manufacturer-defined geometry conventions, and adding automated release checks plus CI enforcement.

---

## 2. Environment and access details

### GitHub

```text
Repository: https://github.com/chriscap/bike-fleet
Primary branch: main
```

### Production

```text
URL: https://www.chriscap.com/bike-fleet/
```

### DreamHost SSH

```text
User: dh_y4z3e9
Host: iad1-shared-b7-14.dreamhost.com
Web directory: ~/chriscap.com/bike-fleet
```

Connection command:

```bash
ssh dh_y4z3e9@iad1-shared-b7-14.dreamhost.com
```

### Important shell distinction

Mac paths begin with `/Users/...`. DreamHost paths begin with `/home/dh_y4z3e9/...`.

Several deployment mistakes occurred because Mac-only commands were run while still logged into DreamHost. Always run:

```bash
whoami
pwd
```

before copying local release files or running deployment commands.

---

## 3. Current source snapshot

This handover bundle includes a copy of the generated v1.3.3 source under `source-snapshot/`.

The source of truth should become the GitHub repository after verifying that the v1.3.3 commit was pushed. The snapshot is useful for comparison if the repository or production site differs.

To compare:

```bash
git diff --no-index /path/to/source-snapshot /path/to/repository
```

---

## 4. Current feature inventory

### Home

- Backup status
- Attention/maintenance queue
- Active bike cards
- Current configurations
- Recent activity

### Fleet

- Bike create/edit/list/detail
- Wheelset create/edit/list/detail
- Installed wheelset assignment
- Bike search and filters
- Profile completeness
- Geometry comparison
- Retül baseline editor
- Fit advisor
- Measurement guide
- Geometry source links

### Workshop

- Parts inventory
- Category-specific fields
- Quantity controls
- Rule-based compatibility
- Manual part verification
- Compatible-spares grouping
- Maintenance create/edit/complete/reopen/delete
- Recurring maintenance

### Ride

- Rule-based setup recommendation
- Presets
- Ride logs
- Print setup card

### More

- JSON export
- Import preview
- Merge/replace restore
- Backup metadata
- Theme preference
- Privacy explanation
- Reset

### PWA

- Manifest and icons
- Offline app-shell cache
- Network-first current assets
- Update banner
- Mobile bottom navigation

---

## 5. Version history

### v1.0

- Initial static fleet manager
- Five bike profiles
- Three mountain-bike wheelsets
- Spare inventory
- Conservative compatibility
- Ride configurator
- Maintenance
- JSON backup
- Offline service worker

### v1.1

- Five-area navigation
- Hash routes and detail pages
- Responsive redesign
- Profile completeness
- Category-specific inventory
- Criteria-level compatibility
- Presets and ride logs
- Recurring maintenance
- Safer import preview
- Themes and PWA update UI

### v1.2

- Geometry & Fit destination
- Three-bike geometry comparison
- Reach-versus-stack plot
- Geometry matrix and handling interpretations
- Retül baseline
- Bike-specific fit storage
- Crank-adjusted saddle estimate
- Category-aware fit guidance

### v1.3.0

- Measurement guide content
- In-app SVG diagrams
- Field-level measurement help

### v1.3.1

- Fixed live Geometry & Fit failure caused by stale Safari/service-worker assets
- Added cache-busted CSS/JS URLs
- Network-first fetch strategy
- `updateViaCache: 'none'`
- Guarded measurement rendering

### v1.3.2

- First major illustration refinement
- Rejected by product owner as worse than the original

### v1.3.3

- Reworked the measurement bicycle again with more realistic wheels, frame, fork, linkage, cockpit, and drivetrain line art
- Generated and packaged; visual acceptance and production deployment remain to be verified

---

## 6. Data and privacy behavior

- Application code and seed data are public on GitHub and the hosted site.
- User edits are stored in the browser key `fleet-os-v1-data`.
- Browser data is not automatically committed, uploaded, or synchronized.
- Theme and backup metadata use separate local-storage keys.
- Clearing Safari website data can remove all user-entered records.
- Always export JSON before instructing the user to clear site data.
- Private windows have separate ephemeral storage and are useful for checking deployment code, not for entering durable data.

The current seed includes personal fit metrics and assessment context. Do not add more personally identifying information to the public seed without explicit approval.

---

## 7. Local development

No build is required.

```bash
cd /path/to/bike-fleet
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Stop with Control+C.

### Recommended new local setup

Add a small Node test toolchain even if production remains static:

```bash
npm init -y
npm install --save-dev @playwright/test prettier eslint
npx playwright install
```

Do not introduce a production framework before baseline tests exist.

---

## 8. Standard release and deployment flow

## 8.1 Before changing code

1. Open the live app in the normal browser profile.
2. Export a JSON backup.
3. Confirm the current repository is clean.
4. Pull latest `main`.

```bash
git status
git pull --ff-only origin main
```

## 8.2 Work locally

- Run a static server.
- Test the current release before modifications.
- Make changes.
- Update all version references.
- Test normal and migrated local data.

## 8.3 Commit and push

```bash
git status
git add <reviewed-file-paths>
git commit -m "Describe the release"
git push origin main
git log --oneline -1
```

## 8.4 Pull on DreamHost

```bash
ssh dh_y4z3e9@iad1-shared-b7-14.dreamhost.com
cd ~/chriscap.com/bike-fleet
git status
git pull --ff-only origin main
git log --oneline -1
```

## 8.5 Verify hashes

On both local and DreamHost:

```bash
git rev-parse HEAD
git rev-parse origin/main
```

They should match.

## 8.6 Verify production

Open a Safari Private Window with a version query:

```text
https://www.chriscap.com/bike-fleet/?v=<version>
```

Check:

- Footer version
- Geometry & Fit route
- Measurement selector
- No console errors
- Normal browser data still present
- Update banner behavior

---

## 9. Service-worker troubleshooting runbook

### Symptom

The live HTML shows a new control, but clicking it fails or old behavior remains.

### Likely cause

Safari is running stale cached JavaScript from the previous service worker.

### Safe diagnostic order

1. Check the live source/footer in a Private Window.
2. Use a version query string.
3. Confirm DreamHost has the intended commit.
4. Confirm `index.html` references the intended asset version.
5. Confirm `service-worker.js` cache name and app-shell URLs match.
6. Reload the normal window and accept the update banner.
7. Only after exporting JSON, remove website data for `chriscap.com` if necessary.

### Never do first

Do not start by clearing all website data. It can erase the only copy of the user’s database.

---

## 10. SSH troubleshooting

The first DreamHost connection showed the standard host-authenticity prompt. The ED25519 key was added to `known_hosts`, after which an initial connection ended with a broken pipe.

If SSH drops:

```bash
ssh -o ServerAliveInterval=30 -o ServerAliveCountMax=3 \
  dh_y4z3e9@iad1-shared-b7-14.dreamhost.com
```

A `git` command executed after a broken SSH session may run locally if the shell has returned to the Mac. Verify `whoami` and `pwd` before proceeding.

---

## 11. Known issues and decisions pending

### Critical / release

1. **v1.3.5 is not yet deployment-verified.** Recheck the release against production before pulling on DreamHost.
2. **The new GitHub Actions workflow has not yet run on the remote branch.** Require a green release check and Playwright job before merge.
3. **The version-bump command inserts pending release-note placeholders.** Replace them before committing a future release.

### Data

4. Import merge only adds IDs that do not exist locally; it does not merge updated fields.
5. Imported data is not schema-validated.
6. Migration is permissive and writes immediately.
7. Wheelset manual compatibility overrides are unsupported.
8. A legacy top-level override structure remains alongside per-part overrides.
9. Bike, wheelset, and part deletion are not implemented.

### Architecture

10. `app.js` is approximately 1,874 lines and owns seed data, domain logic, rendering, routing, editors, storage, and events.
11. `styles.css` is approximately 820 lines.
12. Full application rerender occurs after each save.
13. Ride recommendations depend on hard-coded seed IDs.
14. Inline SVG measurement diagrams are difficult to preview and edit.

### Copy/documentation drift

15. Reset confirmation still mentions the “v1.2 sample database.”
16. Wheelset override copy still mentions “v1.1.”
17. The v1.3.3 README summary does not cleanly distinguish the illustration release from the earlier cache hotfix.
18. Example commit messages in README may be stale.

### Product

19. The app stores only current fit values, not an adjustment history.
20. Measurement diagrams use one generic bike rather than category-specific or selected-bike representations.
21. Fit guidance is useful but not based on a full dynamic biomechanical model.
22. Ride logic is intentionally personal and not suitable as a generalized recommendation engine.

---

## 12. Immediate Codex backlog

## P0 — Establish safety

1. Keep Playwright route, persistence, Geometry & Fit, and offline tests green.
2. Add migration fixtures and no-data-loss tests.
3. Use `npm run release -- <version>` and `npm run release:check` for version changes.
4. Keep README, changelog, and current-version documentation synchronized.
5. Verify repository and production are actually on v1.3.5.
6. Capture current desktop/mobile screenshots before further UI work.

## P0 — Resolve active design work

7. Preserve the owner-approved v1.3.4 bicycle direction.
8. Move future bike-drawing work to a standalone SVG or dedicated module and iterate with visual snapshots rather than editing geometry inside `app.js` blindly.
9. Preserve the named measurement anchor points while changing only the artwork.

## P1 — Data integrity

10. Define and validate a formal database schema.
11. Introduce explicit migrations.
12. Improve merge restore with conflict handling.
13. Consolidate compatibility overrides.
14. Add wheelset overrides.
15. Add archive/delete flows with dependency checks.

## P1 — Architecture

16. Extract pure compatibility, geometry, fit, maintenance, and ride modules.
17. Extract storage, migrations, and import/export.
18. Extract measurement-guide content and SVG rendering.
19. Split CSS.
20. Replace hard-coded ride IDs with tags or editable rules.

## P2 — Product expansion

21. Fit-adjustment history.
22. Service intervals based on riding usage.
23. Attachments/receipts/photos.
24. CSV inventory support.
25. Optional authenticated cross-device sync.

---

## 13. Recommended first pull request

### Title

`Add baseline tests and release-version tooling`

### Scope

- Add Playwright.
- Start a local static server in the test command.
- Test all routes and Geometry & Fit.
- Test local-storage persistence with a fixture.
- Test a versioned service-worker registration.
- Add a release script that updates all version references.
- Fix the outdated v1.1/v1.2 strings.
- Do not refactor domain logic in the same PR.

### Why first

The product has already experienced a production-only stale-cache regression. Tests and version tooling provide the safest foundation for future fit, geometry, and illustration work.

---

## 14. Questions for the product owner before major changes

- Has v1.3.5 been deployed and verified against the accepted illustration and Retül conventions?
- Should the measurement bike be a generic hardtail/trail bike, a generic road bike, or switch by measurement/category?
- Is preserving the current no-build architecture important, or is a small Vite/TypeScript setup acceptable?
- Is cross-device synchronization now a priority?
- Should personal fit assessment context remain in the public seed?
- Should ride recommendations become editable rules?
- Should the next milestone focus on product completeness or engineering hardening?

---

## 15. Handover completion checklist

- [ ] Repository access confirmed
- [ ] Production SSH access confirmed
- [ ] Live JSON backup exported
- [ ] `main` commit identified
- [ ] Live commit identified
- [ ] Version mismatch resolved
- [ ] Source runs locally
- [ ] All primary routes manually tested
- [ ] Current local-storage data fixture saved privately
- [ ] Product documents committed to `/docs`
- [ ] P0 test/release PR opened
- [ ] Measurement illustration direction confirmed
