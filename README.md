# Fleet OS v1.1

Fleet OS is a static, installable bike-fleet manager designed to run from a normal web directory on DreamHost. It uses no build system, database, or server-side code.

## What changed in v1.1

- Five-area responsive navigation: Home, Fleet, Workshop, Ride, and More
- Bookmarkable hash routes and browser Back support
- Action-oriented home dashboard
- Dedicated bike and wheelset profile pages
- Automatic profile-completeness scoring
- Mobile inventory cards and desktop inventory table
- Category-specific spare-component forms
- Criterion-by-criterion compatibility checks
- Bike-specific compatible-spares view
- Saved ride presets and ride logging
- Editable, deletable, and recurring maintenance tasks
- Backup status, safer import preview, merge/replace restore
- Light, dark, and system themes
- Toast confirmations and custom confirmation dialogs
- PWA icons, offline cache, and update notification
- Automatic migration of existing v1.0 browser data

## Deploy to GitHub

Copy the contents of this folder into the root of your local `bike-fleet` repository. Do not copy the outer `fleet-os-v1.1` folder itself.

```bash
cd ~/Downloads/bike-fleet
cp -R ~/Downloads/fleet-os-v1.1/. .
git add .
git commit -m "Upgrade Fleet OS to v1.1"
git push origin main
```

## Deploy to DreamHost

SSH into DreamHost, open the web directory, and pull the new commit:

```bash
cd ~/YOUR_WEB_DIRECTORY
git pull --ff-only origin main
```

Then refresh the live site. The service worker may show an update banner; select **Reload**. A hard refresh may also be needed once after deployment.

## Existing local data

Version 1.1 keeps the same local-storage key used by v1.0 and migrates the data in place. Export a JSON backup before deploying as a precaution.

Data entered on one device remains on that device. It is not automatically pushed to GitHub or synchronized across browsers.

## Hosting in a subdirectory

All paths are relative, so the app works at:

- `https://example.com/`
- `https://example.com/bike-fleet/`
- a DreamHost subdomain

## Local testing

From this folder:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` and stop the server with Control+C.
