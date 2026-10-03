# Priya Gupta portfolio: guide for AI agents

Static portfolio site for Priya Gupta, Product Designer (3+ years). Plain HTML, CSS and JS. No framework, no build step, no package manager. Open `index.html` in a browser, or serve the folder with any static server.

Goal: appeal to senior designers and HR. Look: minimal, modern, playful, light only, one cobalt accent, premium motion. Avoid "AI-slop" patterns.

## Who this is for and the voice
- Audience: senior designers and hiring managers (HR) scanning fast. Make Priya look capable, clear and a little playful. Never generic or "AI-made".
- Voice: plain, confident, human. Short sentences. Concrete verbs ("cut", "built", "designed"), not hype ("seamless", "unleash", "elevate"). No em-dashes or en-dashes anywhere (use a comma, full stop or hyphen).
- Facts about Priya (use only these, never invent numbers or employers): Product Designer (not "Senior"), 3+ years. Jobs: Magnumsoft Engineering (Jul 2025 to now), I Dont Blabber (Jan to Jun 2025), Parshi Technologies (2024), CAD Desk (2023). Studied electrical engineering before design. Works on multi-role SaaS, fintech/insurance, mobile and enterprise products; design systems in Figma; research, usability testing, WCAG 2.1 AA; AI-assisted workflow. Proven numbers already on the site: 9 steps cut to 4, stockouts down 62% (pilot), RentzGo booking steps down 30%. If a new claim or number is needed, ask the owner, do not make it up.
- No city names. No link to her old portfolio.

## Decisions already made (do not reverse unless asked)
- Light only, no dark mode. Warm off-white background, one cobalt accent. Impeccable and taste-skill flag the cream background and Geist font; both are deliberate.
- Custom cursor on mouse devices (a small dot that changes with the background, plus labels). Chosen on purpose even though a style rulebook discourages it.
- Case studies are story pages built from `story-*.js` blocks, not separate hand-made pages. New case studies must use the same template so styling stays consistent.
- Home work grid shows large covers (not a card fan) so images have detail. Placeholder projects stay hidden.
- Section numbers in case studies and "#001" card numbers are intentional.
- Footer socials are icon-only with a hover label. Resume lives in the top nav only.
- Experience is an interactive timeline (desktop horizontal, phone vertical), adapted from Sneha's site.

- **Reduce motion is ignored on purpose** (owner decision, 2026-10-03): all animation plays even when the device has "Reduce Motion" on. The `prefers-reduced-motion` CSS blocks and JS checks were removed (JS keeps `reduced = false` constants). This is less accessible for people with motion sensitivity; the owner accepted that. Do not re-add it unless asked.

## How to handle a request (playbook)
1. Find where the thing lives: text in `js/content.js` or a `js/story-*.js` file; look in "Text that is NOT in content.js" if not found; styles in `css/style.css`.
2. Make the smallest change that does it. Do not refactor or redesign unasked.
3. Keep every rule in "Conventions" (motion limits, contrast, no emoji icons, tap targets, hover gating).
4. Reuse existing blocks, classes and tokens. Add a new CSS value only if no token fits, and put it at the end of the right section.
5. Verify (see below), then tell the owner in plain words what changed and which file.
6. If the request is vague, conflicts with a decision above, or needs a fact you do not have, ask one short question first.

## Common requests and what to touch
| Request | Do this |
| --- | --- |
| Change any wording | `js/content.js` or the story file. Keep length similar so layout does not break. |
| New case study | "Adding a case study" below. Convert images to WebP, set `dims`, write alt text. |
| New project card only | Entry in `SITE.projects` (set `sample: true` to hide). |
| Change colours | Edit tokens in `:root` only. Keep one accent. Check text contrast 4.5:1. |
| Change fonts | Add woff2 to `assets/fonts`, update `css/fonts.css` and `--sans`. Self-host, no Google link. |
| Add a section to home | Add an element in `index.html`, render it in `home.js`, style in `style.css`, add to the nav spy list in `home.js`. |
| Update resume | Replace `assets/Priya_Gupta_Resume.pdf` (same name). Update experience entries and the `<noscript>` text. |
| Change contact details | `content.js` (email, mailHref, phone, phoneHref, links) and the `<noscript>` block in both HTML files. |
| Add a social link | Add `{ label, icon, href }` to `SITE.links`; add the icon path to `js/icons.js` (Simple Icons paths only). |
| Make it faster or lighter | Compress images (WebP, under about 300KB each), keep `width`/`height` on images. |

## Before you say it is done (checklist)
- Open `index.html` and each `case.html?p=` page (virtual-waiter, rentzgo, nexus). No console errors, no sideways scroll at 390px and 1440px wide.
- All images load. Every image has alt text. Links work.
- Hover rules stay inside the hover media query. Do not add `prefers-reduced-motion` handling (see Decisions).
- Text has no em-dashes, no invented numbers, no filler words.
- Nothing from `refs/` was copied in.
- Update `README.md` if a new editable field or file was added.
- Do not commit or push unless asked; offer a commit message instead.

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
js/story-nexus.js     Nexus story           -> window.STORIES["nexus"]
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
Script order matters. index.html: content, icons, main, home, timeline, grid, fx, cursor-label. case.html: content, story-vw, story-rz, story-nexus, icons, main, case, lightbox, fx, cursor-label. `icons.js` must load before `main.js` (footer uses ICONS).

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
- Footer headline = `Let’s <SITE.cycle word> <SITE.footerLine>`. `SITE.available` toggles the footer availability line (`availableNote` is unused). `SITE.work` = title and hint above the work grid.
- Highlight syntax in text: `[[words]]` becomes the accent highlight (stories) and `{t, tone:"hl"}` segments (about).

## Text that is NOT in content.js (change it in these files too)
- Page title, meta description, Open Graph tags and favicon: top of `index.html` and `case.html`.
- `<noscript>` fallback with name, email, resume and social links: `index.html` line ~20 and `case.html` line ~16 (hard-coded; update when contact details change).
- Per-case-study meta description and title: built in `case.js` from the project blurb and story summary.
- Nav labels (Work, About, Resume, Contact) and footer labels (Email, Call, Elsewhere): `js/main.js`.
- Experience timeline labels ("drag me") and cursor labels ("Open project", "View image"): `js/timeline.js`, `js/cursor-label.js`, `data-cl` attributes.

## Working with a non-coder owner
The site owner may not code. Edit `js/content.js` and the `story-*.js` files first, keep changes small, and explain what changed in plain words. `README.md` is the owner-facing how-to; keep it in step with any change to where text lives (for example, a new field in `content.js` needs a row in README section 3).

## Adding a case study
1. Put WebP images in `assets/projects/<slug>/` (cover + figures).
2. Add a project to `SITE.projects` with `story: "<slug>"`.
3. Create `js/story-<x>.js`: `window.STORIES["<slug>"] = { base, wide?, dims?, summary:{outcome,problem,approach}, sections:[{id,n,label,note,h,lede,dark?,blocks:[...]}] }`.
4. Add `<script src="js/story-<x>.js">` to case.html before main.js.
Block types (case.js `renderBlock`): `p, lead, h3, note, eyebrow, img, gallery, duo, duo2, flow, big, versus, keepcut, pair, model, cards (cols 2/3/4, dark, stat), steps, instead, state`. `img` takes `src, alt, cap, pan`. `dims` maps file name to `[w,h]` to avoid layout shift. Every image needs real alt text. Cards: `[kicker, heading, text]`.

## UI behaviours to preserve
- Hero: word-rise headline (`hero.headline` = `l1`, `before`, `circle`, `after`), hand-drawn ring round the `circle` word (hover shows a selection frame and a "Priya" cursor tag), portrait, handwritten notes with pointer parallax, "Currently at" status.
- Section titles: Work (`SITE.work.title`), About (visible h2), Experience.
- Work: `.pgrid` of large covers. First card is featured unless exactly 2 projects. Hover shows the metric, click opens the story.
- Experience: draggable knob on a line with one bump; zones per job; stat bubbles; hint "drag me". Under 760px width a vertical version (`.tlv`) replaces it: it is not pinned: the job under a reading line (55% down the screen) becomes current as the page scrolls, forward and back (IntersectionObserver, no scroll listener); drag and tap still work. The old `.xp` list stays in the DOM but is hidden.
- Footer: cobalt `.panel`, cycling headline word, email, phone, round icon-only social buttons with hover tooltip.
- Scroll-in motion (IntersectionObserver): work cards replay on every pass, down or up (image settles slowly, title follows); the experience timeline redraws its line and glides the knob each time it scrolls into view and resets when fully off screen; page-to-page slide on the hosted site. Only these three; do not add more without asking.
- Cursor: custom dot (mix-blend-mode difference) with label; only on mouse devices.
- Hover rules are gated by `@media (hover: hover) and (pointer: fine)`. Keep that gating when adding styles. The device reduce-motion setting is intentionally ignored.

## Performance notes
- Page weight is small (home about 660KB, case studies 280-390KB on a slow phone profile, compressed). Keep it that way: no frameworks, no web fonts from other sites, WebP images under about 200KB, `width`/`height` on images.
- Content is built by JS, so the first paint waits for the scripts. Already done: portrait and mono font are preloaded in `index.html`; `window.media(src, label, alt, eager)` marks on-screen images as high priority (case-study cover); other images are lazy; the home page prefetches the case-study page and scripts when idle (`warm` in `home.js`). When adding a case study, add its story file name to the `warm` map in `home.js`.
- Test with throttling (Slow 4G, 4x CPU) and a server that sends brotli, not just a fast local one. Targets: first content under about 1.5s, largest image under 2.5s, no layout shift.

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
Content, not inspiration: `refs/mmcg.html` (original page for this project, now rebuilt as `js/story-nexus.js`) and `refs/rentzo-images/` (RentzGo exports).
I only know the exact URLs for avni.design, designerelo.com and hfyj-art.com; the others were saved as files.

## Known gaps
- Placeholder projects (Cartwise, Lumen Health, Roamly) are hidden samples.
- `assets/priya.webp` is cropped from a screenshot; replace with the original export when available.
- Page transitions between home and case studies only work on a hosted site (not `file://`).
