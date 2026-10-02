# Priya Gupta portfolio: guide for AI agents

Static portfolio site for Priya Gupta, Senior Product Designer (3+ years). Plain HTML, CSS and JS. No framework, no build step, no package manager. Open `index.html` in a browser, or serve the folder with any static server.

Goal: appeal to senior designers and HR. Look: minimal, modern, playful, light only, one cobalt accent, premium motion. Avoid "AI-slop" patterns.

## Rules for the user's workflow
- Do not `git commit` or `git push` unless the user explicitly asks.
- Repo-local git identity is Priya Gupta <priyagupta0419@gmail.com>. Remote: github.com/priyaguptaa19/portfolio. Hosting: Netlify (see `netlify.toml`); `.github/workflows/deploy.yml` deploys to GitHub Pages as an alternative.
- Replies to the user: short, plain words. Code comments: minimal.
- Never put a city name or Priya's portfolio link in content. Resume details come from `assets/Priya_Gupta_Resume.pdf`.
- Windows machine. Python is not installed. Use Node for scripts. `Remove-Item` on paths containing "C:\Program" is blocked; use bash `rm` or `[IO.File]::Delete`.

## Files
```
index.html            home shell: #nav #hero #work(.pgrid#deck) #about #exp #footer
case.html             case study shell: #nav #cs #footer. URL: case.html?p=<slug>
css/style.css         all styles (tokens at top, sections in page order, case-study blocks, timeline, cursor)
css/fonts.css         @font-face for local fonts
js/content.js         ALL editable content: window.SITE (name, links, hero, about, tools, experience, projects)
js/story-vw.js        Virtual Waiter story  -> window.STORIES["virtual-waiter"]
js/story-rz.js        RentzGo story         -> window.STORIES["rentzgo"]
js/story-mm.js        MMCG 3.0 story        -> window.STORIES["mmcg"]
js/icons.js           window.ICONS: Simple Icons paths (figma, framer, adobephotoshop, canva, linkedin, behance)
js/main.js            window.media(), window.reveal(), nav HTML, footer panel HTML
js/home.js            hero, nav spy, work grid, about, experience list
js/timeline.js        experience timeline (desktop horizontal + phone vertical)
js/case.js            case-study renderer (reads SITE.projects + STORIES)
js/lightbox.js        native <dialog> image viewer for .sfig images
js/fx.js              footer verb cycle, magnetic .btn.solid
js/grid.js            hero hover grid
js/cursor-label.js    custom pointer (.pt-d dot, .pt-l label, data-cl attributes)
assets/               priya.webp, resume PDF, fonts/, projects/<slug>/*.webp
assets/source/        original images (gitignored)
refs/                 reference sites and exports (gitignored, never edit or ship)
```
Script order matters. index.html: content, icons, main, home, timeline, grid, fx, cursor-label. case.html: content, story-vw, story-rz, story-mm, icons, main, case, lightbox, fx, cursor-label. `icons.js` must load before `main.js` (footer uses ICONS).

## Design tokens (css/style.css `:root`)
- Colours: `--bg #f6f5f0`, `--surface #fcfbf7`, `--ink #12162b`, `--muted #566079`, `--faint #666c82`, `--line` (ink at 12%), single accent `--accent #2c44ff`, `--on-accent #f6f5f0`. Tints for project cards: `--c-coral #ff8a6b`, `--c-mint #7fd8a9`, `--c-butter #f5d658`, `--c-periwinkle #9aa5ff`. Light only.
- Radius: `--r 14px`, `--r-lg 28px`, pills fully round. Width: `--max 1376px`, `--edge` side padding.
- Easing: `--ease cubic-bezier(.22,1,.36,1)`, `--ease-io`.
- Fonts: Geist (UI, local woff2), Geist Mono (labels, `.mono`), Caveat (handwritten notes, `.snote`, timeline captions).
- Headings: weight 500, tracking about -.04em, `text-wrap: balance`. Body 16px+. Labels 12px mono.

## Content model (js/content.js)
`SITE.projects[]` entry: `slug, title, type, blurb, cover, coverAlt, metric, metricShort, metricLabel, role, time, collab, collabLabel?, focus, story?, href?, sample?`.
- `story: "<key>"` renders `STORIES[key]` through case.js. `href` overrides the card link (external page). `sample:true` hides placeholder projects unless `SITE.showSamples` is true.
- `SITE.experience[]`: `when, role, where, result, stats` (stats = `[[big, small], ...]` bubbles on the timeline). Listed newest first; timeline reverses it.
- `SITE.links[]`: `label, href, icon` (icon key in ICONS). `mailHref` is a plain `mailto:` (no subject or body).
- Highlight syntax in text: `[[words]]` becomes the accent highlight (stories) and `{t, tone:"hl"}` segments (about).

## Adding a case study
1. Put WebP images in `assets/projects/<slug>/` (cover + figures).
2. Add a project to `SITE.projects` with `story: "<slug>"`.
3. Create `js/story-<x>.js`: `window.STORIES["<slug>"] = { base, wide?, dims?, summary:{outcome,problem,approach}, sections:[{id,n,label,note,h,lede,dark?,blocks:[...]}] }`.
4. Add `<script src="js/story-<x>.js">` to case.html before main.js.
Block types (case.js `renderBlock`): `p, lead, h3, note, eyebrow, img, gallery, duo, duo2, flow, big, versus, keepcut, pair, model, cards (cols 2/3/4, dark, stat), steps, instead, state`. `img` takes `src, alt, cap, pan`. `dims` maps file name to `[w,h]` to avoid layout shift. Every image needs real alt text. Cards: `[kicker, heading, text]`.

## UI behaviours to preserve
- Hero: word-rise headline, ring around "never", portrait, handwritten notes with pointer parallax.
- Work: `.pgrid` of large covers. First card is featured unless exactly 2 projects. Hover shows the metric, click opens the story.
- Experience: draggable knob on a line with one bump; zones per job; stat bubbles; hint "drag me". Under 760px width a vertical version (`.tlv`) replaces it. The old `.xp` list stays in the DOM but is hidden.
- Footer: cobalt `.panel`, cycling headline word, email, phone, round icon-only social buttons with hover tooltip.
- Cursor: custom dot (mix-blend-mode difference) with label; only on mouse devices.
- Hover rules are gated by `@media (hover: hover) and (pointer: fine)`. `prefers-reduced-motion` turns movement off. Keep both when adding styles.

## Conventions
- UI motion under 300ms, `transform` and `opacity` only, exponential ease-out, never `transition: all`, never animate from `scale(0)`.
- No em-dashes in copy. No duplicate CTAs. No hand-drawn SVG icons (use Simple Icons paths or text). No emoji icons.
- Tap targets 36px+ (44px on touch). Text contrast 4.5:1. Keep one `h1` per page.
- No colour other than `--accent` plus the four tints. No dark mode.
- Images are WebP; convert PNG with sharp (Node). Keep pages under about 4MB.
- Verify changes with headless Chrome (`--dump-dom` plus a `document.title` probe, or `--screenshot`). Headless Chrome has a 500px minimum width and freezes animations, so check phone layouts by forcing `html{width:390px}`.

## Skills used and tested against
Installed in `~/.claude/skills`. Run the relevant ones after UI changes. Ones marked "user only" cannot be started by the agent; the user types the slash command.
- `design-taste-frontend` (taste-skill): main anti-slop rulebook. No em-dashes, no duplicate CTA intent, eyebrow limits, real logos, no hand-drawn icons. Kept as the primary design reference.
- `impeccable`: design polish and detector (`impeccable detect --json <files>`). Flags cream palette, Geist and a faint stripe texture; these are deliberate, so leave them. Fix real defects only (layout-property transitions, clipped overflow).
- `emil-design-eng` (Emil Kowalski): motion rules. Under 300ms for UI, custom ease-out, press feedback (`scale(.94-.98)` on `:active`), hover gated, no `scale(0)`, no `transition: all`.
- `review-animations` (user only, `/review-animations`): audits motion against those rules. Last verdict: approve.
- `mobile-native`: phone behaviour. Tap highlight off, `touch-action`, `dvh`, no ungated hover, `user-select: none` on controls only, never disable zoom.
- `ui-ux-pro-max`: accessibility and UX checklist (contrast 4.5:1, tap targets, alt text, focus rings, no horizontal scroll). Its search script needs Python, which is not installed, so apply its checklist by hand.
- `design-audit`: phased audit (critical, refinement, polish). Present a plan and wait for approval before implementing.
- `typography`: type hierarchy and measure (65-75ch body, tight display tracking).
- Also installed, available when needed: `frontend-design`, `hallmark`, `animate`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `bencium-*`, `design`, `design-system`, `redesign-existing-projects`.
## Inspiration sources
Saved copies in `refs/` (gitignored, reference only, never ship or copy their code or assets):
- Avni: avni.design (portfolio, general layout and tone).
- Designer Elo: designerelo.com ("Designer Elo, Product & Brand Designer").
- Sneha: "sneha's (kinda) organised chaos" (playful personal site). Source of the experience timeline idea (draggable knob, bump in the line, floating bubbles) and of how work cards are displayed.
- Rayna Lai: UI/UX designer site, saved pages: home, about, projects, play, plus case studies Electronic Arts internship, Glint (mobile app) and Pangea (mobile app). Source of the cobalt-style accent and the case-study story layout.
- Jennifer Huang: hfyj-art.com / "Jennifer Huang, HFYJ". Source of the custom cursor that changes (replaces the system pointer) and the #001 project numbering.
Content, not inspiration: `refs/mmcg.html` (original MMCG page, now rebuilt as `js/story-mm.js`) and `refs/rentzo-images/` (RentzGo exports).
I only know the exact URLs for avni.design, designerelo.com and hfyj-art.com; the others were saved as files.

## Known gaps
- Placeholder projects (Cartwise, Lumen Health, Roamly) are hidden samples.
- `assets/priya.webp` is cropped from a screenshot; replace with the original export when available.
- Page transitions between home and case studies only work on a hosted site (not `file://`).
