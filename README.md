# Offensive Fortune

A static, GitHub Pages-ready version of the offensive fortune generator.

## Live site

https://cdonges.github.io/static-offensive-fortune/

## What this is

This project serves a simple static webpage that loads a random fortune from a JSON file generated from the original Unix fortune data set. It intentionally avoids any database or server-side request logging.

## Files

- `index.html` — page markup
- `styles.css` — styling
- `app.js` — client-side random fortune picker
- `fortunes.json` — generated fortune list
- `build_fortunes.py` — script to regenerate the JSON from `/usr/share/games/fortunes/off`
- `.github/workflows/pages.yml` — GitHub Actions workflow for GitHub Pages deployment

## Regenerate the fortune list

From the project root:

```bash
python3 build_fortunes.py
```

## Local preview

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Deployment

This site is designed to be deployed through GitHub Pages using the included workflow. In the repository GitHub settings:

1. Open Settings → Pages
2. Set Source to GitHub Actions
3. Push to `main` or `master`

The workflow will publish the site automatically.
