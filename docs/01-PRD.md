# Fleet OS Product Requirements Document

**Product:** Fleet OS  
**Current prototype version:** 1.3.3  
**Product type:** Personal, local-first progressive web application  
**Primary user:** A single bike owner managing multiple bikes, wheelsets, parts, setup knowledge, fit data, and maintenance  
**Status:** Working prototype in active iteration

---

## 1. Product summary

Fleet OS is a personal operating system for a bike fleet. It connects information that is normally fragmented across notes, receipts, manufacturer charts, memory, workshop bins, and ride logs.

The product currently supports:

- Bike and wheelset profiles
- Spare-parts inventory
- Conservative compatibility checking
- Maintenance tracking
- Ride setup recommendations and presets
- Geometry comparison
- A Retül-informed fit baseline and fit-transfer advisor
- Visual measurement guides
- JSON backup and restore
- Offline installation as a progressive web app

The application is intentionally transparent about uncertainty. Missing standards remain unknown, compatibility is not overstated, and fit advice is framed as a starting point rather than a diagnosis.

---

## 2. Problem statement

A rider with several bikes and interchangeable parts needs to answer recurring questions:

- What exactly is installed on each bike?
- Which wheelset, cassette, rotor, tire, chain, or brake consumable can be used on which bike?
- What needs service, and when was it last completed?
- Which setup is appropriate for a planned ride?
- How do two frames differ geometrically?
- How should a trusted fit baseline inform another bike without assuming all categories should feel identical?
- How were measurements taken, and can they be repeated consistently?

Existing notes and manufacturer pages do not provide one coherent system. Fleet OS creates a connected, auditable record that remains usable at the workbench and trailhead.

---

## 3. Target user

### Primary user

A technically engaged rider who:

- Owns multiple road, gravel, XC, and trail bikes
- Rotates wheelsets and components
- Performs or coordinates maintenance
- Wants documented compatibility rather than guesses
- Has a professional fit report that should inform future setup decisions
- Values local ownership of data and does not require a social product

### Current product model

Fleet OS is a single-owner product. Multi-user accounts, shop workflows, shared fleets, and public profiles are not part of the current scope.

---

## 4. Product vision

> Make every bike, component, setup, measurement, and maintenance decision traceable in one calm, trustworthy system.

Fleet OS should become the rider’s durable source of truth: useful before a purchase, during workshop work, when configuring a ride, and when comparing future bikes.

---

## 5. Goals

### G1. Establish one source of truth for the fleet

Store structured profiles for bikes, wheelsets, components, fit measurements, geometry, maintenance, and ride configurations.

### G2. Reduce compatibility mistakes

Evaluate known interfaces conservatively, show criterion-level reasoning, and allow a physical or documentary verification to override a rule-based result.

### G3. Preserve repeatable setup knowledge

Record actual bike-specific fit coordinates, tire-pressure presets, suspension notes, and successful ride setups.

### G4. Make geometry understandable

Compare up to three bikes, show deltas against a reference, plot reach versus stack, and translate differences into plain-language handling implications.

### G5. Use professional fit data responsibly

Use the Retül result as a measured baseline while distinguishing road/gravel fit transfer from mountain-bike posture and handling needs.

### G6. Keep the product local-first and resilient

Run from static hosting, work offline after installation, store edits in the browser, and support explicit JSON export/import.

### G7. Make uncertainty visible

Unknown data must remain unknown. Manufacturer, fitter, owner, and physical-verification sources should be recorded where practical.

---

## 6. Non-goals

The current product does **not** aim to provide:

- Medical diagnosis, injury treatment, or a replacement for an in-person bike fit
- Automated bike-buying recommendations or a record of the earlier purchase decision process
- Trail discovery, navigation, social feeds, leaderboards, or community content
- E-commerce, price tracking, retailer integrations, or transaction management
- Automatic scraping of manufacturer geometry or component specifications
- Real-time sensor, GPS, power-meter, or suspension telemetry
- Multi-user collaboration, shop accounts, permissions, or shared fleets
- Guaranteed compatibility in place of manufacturer documentation or physical verification
- Cloud synchronization in the current implementation

---

## 7. Product principles

### Trust before convenience

A clear “unknown” is better than a confident but unsupported answer.

### Explain the result

Compatibility and fit recommendations should show the inputs and reasoning, not only a status.

### Measured fit is separate from frame geometry

Frame reach and stack describe a frame. Handlebar and grip coordinates describe the rider’s actual contact points. The application must not conflate them.

### Category-aware fit transfer

Road/gravel coordinates may be compared directly when measurement conventions match. Mountain-bike recommendations should use the fit baseline as context for mobility, saddle position, and leg extension—not as a cockpit template.

### User owns the data

Edits remain local unless the user explicitly exports or later enables synchronization.

### Small, reversible adjustments

The fit workflow should encourage one-variable-at-a-time changes and preserve the previous setting.

### Workshop usability

The interface should remain readable, touch-friendly, responsive, and useful on a phone near the bike.

---

## 8. Information architecture

### Home

- Backup state
- Open maintenance queue
- Active fleet overview
- Current configurations
- Recent activity
- Quick paths to ride planning and maintenance

### Fleet

#### Bikes

- Filter and search
- Bike cards
- Bike detail pages
- Profile-completeness indicator
- Installed wheelset assignment
- Geometry and fit editing

#### Wheelsets

- Wheelset cards and detail pages
- Standards, tires, pressures, rotor/cassette information
- Bike compatibility summary

#### Geometry & Fit

- Up-to-three-bike comparison
- Selectable reference bike
- Reach-versus-stack plot
- Geometry matrix and deltas
- Handling interpretations
- Editable Retül baseline
- Bike-specific fit advisor
- Measurement definitions and diagrams
- Geometry source traceability

### Workshop

#### Inventory

- Category, location, bike, and search filters
- Quantity controls
- Category-specific component fields

#### Compatibility

- Component-to-bike comparison
- Criterion-level status and explanation
- Manual verification with date and method
- Compatible-spares grouping by bike

#### Maintenance

- Bike, status, and priority filters
- Create, edit, complete, reopen, and delete tasks
- Recurring tasks
- Completion history fields

### Ride

- Destination, ride type, conditions, priority, mileage, and technical level
- Rule-based bike/wheelset/setup recommendation
- Save preset
- Log ride
- Print setup card

### More

- JSON export/import
- Backup status
- Theme selection
- Privacy explanation
- Local-data reset
- App version

---

## 9. Functional requirements and acceptance criteria

## 9.1 Data ownership, persistence, and backup

### Requirements

- Store user edits in the browser.
- Preserve data across application code upgrades.
- Export the complete database as human-readable JSON.
- Preview imports before applying them.
- Support replace and merge import modes.
- Show last backup time and changes since backup.
- Warn before destructive reset or cache-clearing instructions.

### Acceptance criteria

- Reloading the site retains all saved edits.
- Deploying a new static release does not replace local records.
- Exported JSON includes bikes, wheelsets, parts, maintenance, presets, rides, activity, fit, geometry, and metadata.
- Replace import restores the selected backup.
- Merge import does not delete existing records.
- A failed JSON parse does not alter stored data.
- The user can see whether a recent backup exists.

## 9.2 Bike profiles

### Requirements

Each bike may store:

- Identity, year, category, size, status, role, and image
- Wheel, axle, freehub, drivetrain, brake, rotor, fork, shock, and weight information
- Installed wheelset
- Frame geometry and source
- Bike-specific fit coordinates
- Ownership, serial, build, geometry, and general notes

### Acceptance criteria

- A bike can be added and edited without a build step.
- Unknown values can remain blank or explicitly unknown.
- Required brand and model fields are enforced.
- Bike details render correctly on desktop and mobile.
- A bike can be opened directly through a hash URL.
- A bike can be sent directly into geometry comparison or ride planning.

## 9.3 Wheelset profiles

### Requirements

- Record wheel size, axle standards, freehub, rotor interface, cassette, rotor sizes, tires, pressure presets, role, and notes.
- Show compatible bikes using conservative rules.
- Allow assignment to a bike, with a wheelset assigned to no more than one bike at a time in the current UI.

### Acceptance criteria

- Editing a wheelset updates its profile and compatibility results.
- Assignment removes the same wheelset from another bike.
- Trail and bike-park pressures remain independently stored.

## 9.4 Geometry comparison

### Requirements

- Compare two or three bikes.
- Allow any selected bike to be the reference.
- Show absolute values and deltas.
- Plot frame reach versus stack.
- Interpret key geometry differences in plain language.
- Store source labels and URLs.
- Keep missing values blank rather than calculating unsupported values.

### Supported geometry fields

- Reach
- Stack
- Head-tube angle
- Effective seat angle
- Effective top tube
- Wheelbase
- Chainstay/rear center
- Front center
- Bottom-bracket drop
- Bottom-bracket height
- Standover
- Head-tube length
- Seat-tube length
- Fork travel

### Acceptance criteria

- The selected bikes and reference update the table, plot, summary cards, and interpretations together.
- A missing metric displays as unavailable rather than zero.
- Cross-category comparisons show a warning that frame geometry is not a direct fit target.
- Geometry links are sanitized to HTTP/HTTPS before rendering.

## 9.5 Retül baseline and fit advisor

### Requirements

- Store the measured rider baseline separately from bike records.
- Preserve the original fit source and date.
- Store bike-specific crank, saddle, stem, spacer, handlebar, and grip measurements.
- Calculate a crank-length-adjusted saddle-height starting estimate.
- Compare road/gravel cockpit coordinates with the baseline.
- Use category-specific language for mountain bikes.
- Show confidence levels and explicit cautions.

### Current baseline seeded in the tool

- Baseline crank length: 170 mm
- Saddle height: 669 mm
- Saddle setback: −52 mm
- Saddle angle: +1° under the report convention
- Saddle-to-bar reach: 490 mm
- Handlebar drop: 6 mm under the report convention
- Grip reach: 597 mm
- Grip drop: 23 mm under the report convention
- BB-to-grip reach: 544 mm
- Handlebar stack: 632 mm
- Handlebar reach: 438 mm
- Grip width: 405 mm
- Grip angle: 29°

The stored assessment context includes limited ankle, hamstring, hip, and forward-spinal-flexion mobility plus prior left-knee and right-hamstring concerns. This context supports conservative language but must not be turned into medical diagnosis.

### Acceptance criteria

- The baseline remains editable.
- Changing a bike’s crank length updates the suggested saddle-height starting point.
- Road/gravel comparisons show bar stack/reach deltas when both values exist.
- Mountain-bike recommendations do not instruct the user to copy road bar coordinates.
- The UI advises the user to record the current setup before making changes.
- The UI advises stopping when pain, numbness, asymmetry, or loss of control worsens.

## 9.6 Measurement guide

### Requirements

- Explain each measurement using a consistent definition.
- Show “measure from,” “measure to,” purpose, steps, and consistency tips.
- Provide visual diagrams inspired by the clarity of the original fit report without reproducing its artwork.
- Keep measurement anchors aligned with the data fields used by the app.
- Support both side-view and front-view diagrams.

### Current guide topics

- Saddle height
- Saddle setback
- Saddle angle
- Crank length
- BB-to-handlebar stack
- BB-to-handlebar reach
- Saddle-to-bar reach
- Handlebar drop
- Saddle-to-grip reach
- Grip drop
- Grip width
- Frame reach and stack
- Wheelbase, chainstay, and front center

### Acceptance criteria

- Changing the guide selector updates the diagram and instructions.
- The guide cannot throw an error that prevents Geometry & Fit from opening.
- Labels remain readable at desktop and mobile widths.
- The bicycle drawing is visually credible enough that measurement anchors are immediately understandable.
- Field help in the bike editor uses the same terminology as the guide.

## 9.7 Inventory

### Requirements

- Track quantity, condition, location, purchase date, cost, and notes.
- Support category-specific fields for cassettes, chains, brake items, rotors, and tires.
- Filter by category, location, compatible bike, and search text.
- Adjust quantity directly from the inventory view.

### Acceptance criteria

- Quantity never drops below zero.
- Category changes update the relevant editor fields.
- Compatibility filtering uses the same engine as the Compatibility view.

## 9.8 Compatibility engine

### Requirements

- Return one of: direct, conditional, emergency, not compatible, or unknown.
- Evaluate criterion by criterion.
- Prefer unknown over unsupported assumptions.
- Support manual verification for spare parts with status, reason, date, and method.
- Show the source as rule-based or manual verification.

### Current automatic categories

- Chain
- Cassette
- Tire
- Rotor
- Brake pads/service/hardware through brake-family rules
- Wheelset

### Acceptance criteria

- A definitive mismatch produces “not compatible.”
- Missing critical standards produce “unknown” or “conditional,” not “direct.”
- Wheelsets never receive an unconditional direct result from the rule engine because cassette, rotor alignment, and clearance still require verification.
- A saved manual part override takes precedence over automatic rules.
- The criteria remain visible alongside the summary.

## 9.9 Maintenance

### Requirements

- Add, edit, complete, reopen, and delete tasks.
- Store bike, priority, status, due date or flexible label, recurrence, cost, notes, and completion date.
- When a recurring task is completed, create the next task.

### Acceptance criteria

- Completed tasks remain visible when the completed filter is selected.
- Reopening clears completion state.
- Recurring completion creates a new open task with a future due date.
- Deletion requires confirmation.

## 9.10 Ride configurator

### Requirements

- Accept destination, ride type, conditions, priority, mileage, and technical level.
- Recommend a starting bike, wheelset, pressure, suspension note, and pack list.
- Save the output as a reusable preset.
- Log the actual ride and outcome.
- Print a setup card.

### Acceptance criteria

- The recommendation is framed as a starting point.
- A preset restores the form and recommendation.
- A ride log can store date, rating, actual pressure, and notes.
- The current rule set continues to work even when some seeded records are edited, provided referenced IDs still exist.

## 9.11 PWA, offline use, themes, responsiveness, and accessibility

### Requirements

- Install as a PWA.
- Cache the application shell for offline use.
- Use network-first behavior for current assets to reduce stale releases.
- Support light, dark, and system themes.
- Provide desktop sidebar and mobile bottom navigation.
- Support keyboard focus, dialogs, reduced motion, and print styling.

### Acceptance criteria

- The app loads after a successful first visit when offline.
- A new service worker shows an update notice.
- The Geometry & Fit route works after deployment in Safari.
- No horizontal overflow occurs at common phone widths.
- Interactive controls have visible focus states and meaningful labels.
- Reduced-motion preference disables nonessential movement.

---

## 10. Core user journeys

### Journey A: Record a new bike

1. Open Fleet → Bikes.
2. Add bike.
3. Enter identity and standards.
4. Add manufacturer geometry and source.
5. Record actual fit measurements later.
6. Save and review completeness.

### Journey B: Check whether a part fits

1. Open Workshop → Compatibility.
2. Select a component and bike.
3. Review summary and each criterion.
4. Physically or documentarily verify the result.
5. Save status, reason, method, and date.

### Journey C: Compare two bikes

1. Open Fleet → Geometry & Fit.
2. Select Bike A, Bike B, and optional Bike C.
3. Choose a reference.
4. Review summary cards, plot, table, and interpretation.
5. Open source links for verification.

### Journey D: Transfer a fit baseline

1. Select a target bike in the fit advisor.
2. Record its crank length and current measurements.
3. Review the crank-adjusted saddle-height estimate.
4. Review category-aware cockpit guidance.
5. Use the measurement guide.
6. Change one variable at a time and log notes.

### Journey E: Prepare for a ride

1. Enter ride context.
2. Build a recommendation.
3. Review bike, wheelset, pressure, suspension, and pack notes.
4. Save a preset or log the ride.
5. Use the log to refine future setup.

### Journey F: Protect data before an update

1. Open More → Backup and restore.
2. Export JSON.
3. Deploy or refresh the application.
4. Verify data remains intact.
5. Import the backup only if needed.

---

## 11. Trust, provenance, and privacy

- Manufacturer geometry should retain a source label and URL.
- Fitter measurements should retain the fit source and date.
- Owner-provided values should be labeled as such.
- Physical compatibility checks should retain method and date.
- Public repository seed data must be treated as public.
- Browser-entered data remains private to that browser unless exported.
- The app currently has no login, encryption layer, or server database.
- Personal fit and injury-context data should be minimized in future public seed data if the repository becomes broadly shared.

---

## 12. Success metrics

Because this is currently a personal tool, success is best measured by product quality and practical use rather than growth metrics.

### Reliability

- Zero data loss during a normal upgrade.
- 100% of releases pass a local and production smoke test.
- Export and replace-restore succeed with a representative database.

### Completeness

- Active bikes have verified identity, standards, geometry source, and key fit fields.
- Compatibility-critical parts have sufficient structured standards to avoid “unknown” where documentation exists.

### Trust

- Every manual compatibility result includes method and date.
- No unsupported direct-fit claim is produced by automatic logic.
- Fit advice always includes category and confidence context.

### Usability

- Core tasks can be completed on a phone without horizontal scrolling.
- Geometry & Fit opens and renders without console errors.
- A measurement definition can be found in two interactions or fewer from Geometry & Fit.

### Data stewardship

- Backup status is visible.
- The owner exports regularly enough that changes-since-backup does not remain high for long periods.

---

## 13. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Local-storage loss or browser-data clearing | Loss of user records | Prominent backup status, JSON export, future cloud sync |
| Stale service worker | New UI appears broken or old code runs | Versioned assets, network-first fetch, update banner, smoke testing |
| Overconfident compatibility | Component damage or unsafe setup | Conservative rules, criterion details, manual verification |
| Fit advice interpreted as medical guidance | Injury risk | Strong caveats, confidence labels, one-variable protocol |
| Measurement inconsistency | Misleading comparisons | Definitions, diagrams, source notes, repeated reference points |
| Public seed data exposes personal details | Privacy concern | Minimize public seed data, separate demo and personal database in future |
| Monolithic JavaScript becomes difficult to change | Regression risk | Modularization and automated tests |

---

## 14. Product roadmap

### Near term: harden the existing product

- Automated smoke and regression tests
- Approved measurement-guide illustrations
- Centralized versioning and release tooling
- Schema validation and safer migrations
- Fix outdated copy and documentation drift
- Add deletion/archive flows for bikes, wheelsets, and parts
- Add wheelset manual compatibility overrides
- Improve import merge behavior

### Medium term: deepen fleet intelligence

- Service intervals based on ride hours or mileage
- Better setup-history comparison
- Fit-adjustment history with before/after values
- More complete geometry visualization
- Receipt/photo/document attachments
- CSV import/export for inventory
- Printable bike and maintenance reports

### Long term: optional cloud layer

- Authentication
- Encrypted server-side persistence
- Cross-device sync
- Conflict resolution
- Photo/document storage
- Explicit separation between private user data and public application code

---

## 15. Open product questions

- Should the next fit iteration optimize for road/gravel transfer, mountain-bike setup, or both equally?
- Should fit adjustments become a time-based history rather than only the current value?
- Should the measurement guide show a generic bike, category-specific bikes, or the actual selected bike?
- Should demo/seed data be removed from the public production build once personal data is established?
- Is cloud sync desired, or should the product remain intentionally local-first with stronger backup tooling?
- Should compatibility support assemblies and adapters as first-class records rather than free-text requirements?
- Should ride recommendations remain rule-based and personal, or become editable decision tables?
