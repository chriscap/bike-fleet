# Fleet OS v1.0

A static, DreamHost-ready bike fleet manager.

## Included

- Five bike profiles: Santa Cruz Blur TR, Yeti SB140, Parlee Chebacco XD, Parlee Z5, Wraith Paycheck
- Three mountain-bike wheelsets and tire configurations
- Spare-parts inventory
- Conservative compatibility checker with manual overrides
- Ride configurator
- Maintenance tracker
- JSON import/export backups
- Offline service worker and web-app manifest

## Deploy to DreamHost

1. Unzip the package.
2. Upload the **contents** of `fleet-os-v1.0` to the desired DreamHost web directory using SFTP or the file manager.
3. Keep `index.html`, `assets`, `manifest.webmanifest`, and `service-worker.js` in the same relative structure.
4. Use HTTPS. DreamHost can provide Let's Encrypt certificates.
5. Open the site in a browser. Data is saved in that browser's local storage.

## Important data note

Version 1.0 stores data locally in the browser. It does not automatically sync across devices. Use **Data & backup → Download JSON** regularly, then import that file on another device if needed.

## Local preview

From the parent folder:

```bash
python3 -m http.server 8000 --directory fleet-os-v1.0
```

Then visit `http://localhost:8000`.

## Known Version 1.0 limitations

- No cloud account or cross-device synchronization
- No photo upload storage
- Compatibility rules are intentionally conservative and do not replace manufacturer documentation
- Some bike and wheel standards remain marked Unknown until verified
- No server-side authentication

## Recommended next release

- Password-protected DreamHost/PHP + MySQL sync
- Photo and receipt uploads
- Recurring service intervals based on ride hours
- Printable ride cards
- More detailed geometry and fit module
- CSV import for spare-parts inventory
