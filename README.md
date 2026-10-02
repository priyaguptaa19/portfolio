# Priya Gupta, portfolio

Portfolio site for Priya Gupta, Senior Product Designer. Plain HTML, CSS and JavaScript. No build step.

## Pages
- **Home** (`index.html`): hero, selected work, about, experience timeline, footer with contact.
- **Case studies** (`case.html?p=<slug>`): Virtual Waiter, RentzGo, MMCG 3.0.

## Run it
Open `index.html` in a browser. For page transitions and the closest match to production, serve the folder:

```
npx serve .
```

## Edit content
Everything editable is in `js/content.js` (name, links, hero text, about, tools, experience, projects). Case-study text is in `js/story-*.js`. Images live in `assets/`.

To add a case study, see "Adding a case study" in [CLAUDE.md](CLAUDE.md).

## Deploy
- **Netlify:** import the repo, leave the build command empty, publish directory `.` (settings are in `netlify.toml`).
- **GitHub Pages:** the workflow in `.github/workflows/deploy.yml` publishes on every push to `main`. Turn on Settings, Pages, Source: GitHub Actions.

## Notes for contributors and AI agents
See [CLAUDE.md](CLAUDE.md) for the file map, design tokens and conventions.
