# Changelog

## 1.3.1

### Hotfix
- Added cache-busted JavaScript and CSS asset URLs.
- Registered the service worker with `updateViaCache: none`.
- Switched static assets to network-first caching with offline fallback.
- Added a guarded measurement-guide render so a diagram error cannot block Geometry & Fit navigation.


## 1.3.0

### Measurement guides
- Added a dedicated measurement guide section to Geometry & Fit.
- Added in-app visual diagrams for key fit measurements, including saddle height, setback, angle, cockpit coordinates, grip coordinates, and crank length.
- Added geometry diagrams for frame reach/stack and wheelbase/front-center/chainstay interpretation.
- Added definition, measure-from / measure-to, and consistency-tip content for each guide.
- Added field-level help text to the geometry and fit editor inputs.

### PWA
- Updated cache version to `fleet-os-v1.3.0`.

## 1.2.0

### Geometry comparison
- Added a dedicated Geometry & Fit destination under Fleet.
- Added three-bike comparison controls and selectable reference bike.
- Added a responsive reach-versus-stack visualization.
- Added a detailed geometry matrix with deltas from the reference bike.
- Added plain-language handling interpretations for reach, stack, head angle, wheelbase, chainstay, bottom-bracket height, and seat angle.
- Added editable geometry fields and source metadata to every bike profile.
- Added direct links from bike detail pages into the comparison view.

### Retül fit tools
- Added the April 2022 Parlee Chebacco Retül baseline as a separately editable rider record.
- Added bike-specific fit-coordinate storage.
- Added crank-length-adjusted saddle-height starting estimates.
- Added discipline-aware fit guidance for road/gravel and mountain bikes.
- Added mobility and injury-history context from the fit assessment, with prominent safety caveats.
- Added a one-variable-at-a-time adjustment protocol and confidence labels.

### Data and migration
- Added nested `geometry` and `fit` records to bike profiles.
- Preserved existing v1.0/v1.1 local data while merging new defaults.
- Seeded manufacturer-sourced geometry for the 2023 Santa Cruz Blur TR Small and 2024 Yeti SB140 Small with 150 mm fork.
- Retained owner-provided Wraith Paycheck geometry and left undocumented values unknown.

### PWA
- Updated cache version to `fleet-os-v1.2.0`.
- Updated app metadata to include geometry and fit functionality.

## 1.1.0

### UX
- Consolidated eight top-level tabs into five primary destinations.
- Added browser-address routes for direct linking and Back navigation.
- Reordered the dashboard around attention, planning, configurations, and recent activity.
- Added detailed bike and wheelset profiles.
- Replaced manually entered completeness percentages with automatic calculation.
- Added bike-filtered inventory and a full compatible-spares view.
- Added saved ride presets, printable setup cards, and ride history.
- Added due dates, recurrence, editing, deletion, costs, and completion history to maintenance.
- Added import preview with merge and replace options.

### UI
- Added desktop sidebar and mobile bottom navigation.
- Added stronger card hierarchy, bike photography support, and technical placeholders.
- Added mobile inventory cards.
- Added grouped, scrollable dialogs with sticky actions.
- Added theme controls, toast feedback, PWA icons, and update messaging.
- Improved keyboard focus, touch targets, reduced-motion support, and print styling.

### Data and compatibility
- Added category-specific component fields.
- Added criterion-level compatibility results for cassettes, chains, brakes, rotors, tires, and wheelsets.
- Added verification date and method to manual compatibility records.
- Preserved and migrated v1.0 local browser data.
