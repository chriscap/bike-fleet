# Fleet OS v1.3.2

Fleet OS is a static, installable bike-fleet manager designed to run from a normal web directory on DreamHost. It uses no build system, database, or server-side code.

## What changed in v1.3.2

### Live-site navigation hotfix

- Added versioned asset URLs so Safari and the service worker fetch the current JavaScript and CSS.
- Changed static-asset requests to network-first with offline cache fallback.
- Disabled service-worker update caching and added a safe fallback if a measurement diagram cannot render.

### Measurement guides and visual definitions

- Added an in-app measurement guide under Geometry & Fit.
- Added visual diagrams for the most important fit and geometry measurements.
- Added step-by-step instructions for how to measure saddle height, setback, angle, cockpit coordinates, frame reach/stack, and wheelbase-related dimensions.
- Added field-level help text to geometry and fit inputs so the data-entry workflow references the same definitions as the guide.

### Geometry comparison

- Compare up to three bikes at once.
- Choose any selected bike as the reference.
- View reach-versus-stack visually.
- Compare reach, stack, head angle, seat angle, wheelbase, chainstay, front center, bottom-bracket measurements, standover, and fork travel.
- Read plain-language handling interpretations based on the recorded deltas.
- Store a source label and source URL with each bike's geometry.

### Retül fit tools

- Stores the April 2022 Retül baseline from the Parlee Chebacco.
- Keeps the measured fit separate from manufacturer frame geometry.
- Records bike-specific fit values such as crank length, saddle height, saddle setback, saddle angle, stem, spacers, and cockpit coordinates.
- Suggests a starting saddle-height transfer when crank length changes.
- Gives discipline-aware guidance: road/gravel comparisons use cockpit coordinates, while mountain-bike advice treats the road fit as a mobility and saddle-position reference rather than a direct cockpit prescription.
- Labels calculated suggestions by confidence and explains what still needs physical verification.

## Important fit note

The fit advisor is a setup aid, not medical advice and not a substitute for an in-person fit. The Retül report was completed on a road/gravel bike. Mountain-bike posture, bar width, controls, suspension sag, saddle shape, and terrain can require materially different coordinates.

Change one variable at a time, record the original setting, and stop if an adjustment causes pain, numbness, loss of control, or worsening asymmetry.

## Existing data and migration

Version 1.3 preserves the local-storage key used by earlier releases. Existing v1.0 and v1.1 records are merged with the new geometry and fit fields when the app opens.

Export a JSON backup from the live site before deploying. Data entered on one device remains on that device; it is not automatically pushed to GitHub or synchronized across browsers.

## Deploy to GitHub — run on your Mac

Download and unzip `fleet-os-v1.3.2.zip`. Copy the **contents** of the unzipped folder into the root of your local `bike-fleet` repository:

```bash
cd ~/Downloads/bike-fleet
cp -R ~/Downloads/fleet-os-v1.3.2/. .
git status
git add .
git commit -m "Fix Geometry and Fit navigation cache"
git push origin main
```

Do not run those commands while logged into DreamHost.

## Deploy to DreamHost — run after connecting by SSH

```bash
cd ~/chriscap.com/bike-fleet
git pull --ff-only origin main
git status
git log --oneline -1
```

Then open the live site. Fleet OS should display an update notice; choose **Reload**. In Safari, a private window is a useful deployment check. If an older service-worker copy remains, export a backup before removing website data for `chriscap.com`.

## Hosting in a subdirectory

All paths are relative, so the app works at a domain root, a subdomain, or a subdirectory such as `/bike-fleet/`.

## Local testing

From the unzipped folder:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` and stop the server with Control+C.

## Data provenance

The seeded Blur TR and SB140 geometry values identify their manufacturer sources in the app. The Chebacco fit baseline and measured frame stack/reach come from the provided Retül report. Wraith values are marked as owner-provided. Unknown values remain blank rather than being inferred.
