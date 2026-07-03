# Disko's Commander's Atlas

Release 1.3 — Application Structure

This release changes the Atlas from a handful of loose files into a simple GitHub Pages application structure.

## Upload structure

Keep `index.html` at the root of the repository.

Upload these folders and files together:

```text
index.html
README.md
assets/
  css/styles.css
  js/app.js
data/
  fleet.js
  atlas.js
docs/
```

## Current scope

- Disko-first command center
- No 907th section for now
- Personal fleet only
- Fleet data separated into `data/fleet.js`
- Location and toolbox data separated into `data/atlas.js`
- App behavior moved into `assets/js/app.js`
- Styling moved into `assets/css/styles.css`

## Next releases

- Release 1.4: Fleet detail pages
- Release 1.5: ArcCorp starter pages
- Release 1.6: Toolbox data records
