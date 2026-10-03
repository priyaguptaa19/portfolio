# Priya Gupta, portfolio

The portfolio site for Priya Gupta, Product Designer. It is plain web files. There is nothing to install and no build step.

- **Home page** (`index.html`): hero, work, about, experience timeline, footer with contact details.
- **Case studies** (`case.html?p=<name>`): Virtual Waiter, RentzGo and Nexus.

You do not need to know how to code to change the text, photos and links. This guide shows how.

## 1. See your changes

1. Open the project folder.
2. Double-click `index.html`. It opens in your browser.
3. After you save a change, refresh the page (F5) to see it.

Case studies open from the cards on the home page, or at `case.html?p=virtual-waiter`, `case.html?p=rentzgo` and `case.html?p=nexus`.

## 2. Where things live

| What you want to change | File |
| --- | --- |
| Almost all text: name, email, headline, about, experience, project cards | `js/content.js` |
| The text inside a case study | `js/story-vw.js` (Virtual Waiter), `js/story-rz.js` (RentzGo), `js/story-nexus.js` (Nexus) |
| Photos, resume and case-study images | the `assets/` folder |
| Colours, fonts, spacing | `css/style.css` (top of the file) |
| The page title and description shown on Google | the top of `index.html` |

Everything else (`js/home.js`, `js/main.js`, `js/case.js` and so on) is the engine. Leave those alone unless you know what you are doing.

## 3. Common changes (all in `js/content.js`)

Open `js/content.js` in any text editor (Notepad works, VS Code is better). Change only the text between the quote marks. Keep the quote marks, commas and brackets exactly where they are.

| I want to change | Find this line | Example |
| --- | --- | --- |
| Email | `email:` and `mailHref:` (change both) | `email: "me@example.com"` and `mailHref: "mailto:me@example.com"` |
| Phone | `phone:` and `phoneHref:` (change both) | `phoneHref: "tel:+911234567890"` |
| LinkedIn or Behance link | `links:` | change the `href:` web address |
| Job title | `role:` and `hero: { tag: ... }` | `"Product Designer"` |
| Headline words | `hero: { headline: ... }` | `l1` is the first line, `before` and `after` surround the circled word, `circle` is the circled word |
| Line under the headline | `sub:` inside `hero` | any sentence |
| The three handwritten notes next to the photo | `notes:` | change the `t:` text |
| "Open to product design roles" line in the footer | `available:` | `true` shows it, `false` shows "Not available right now" |
| Footer headline | `cycle:` and `footerLine:` | it reads "Let's [word] + footerLine". The words in `cycle` rotate. |
| Work section title | `work:` | `title:` |
| About paragraphs | `about:` | Wrap a phrase in its own `{ t: "…", tone: "hl" }` to highlight it in blue |
| The three quick facts under About | `proof:` | each is `["bold start", "rest of the sentence"]` |
| Toolkit chips | `tools:` | add or remove a line like `{ n: "Figma", icon: "figma", hex: "#F24E1E" }` |
| Experience | `experience:` | each job has `when`, `role`, `where`, `result` and `stats` (the little bubbles) |
| Project cards on the home page | `projects:` | `title`, `blurb`, `metric` and so on |

Tip: after every change, refresh the page. If the page goes blank, you probably deleted a quote mark, comma or bracket. Press Ctrl+Z to undo and try again.

### Replace the photo or resume
- **Photo:** replace `assets/priya.webp` with a new image of the same name. WebP is best (use squoosh.app to convert).
- **Resume:** replace `assets/Priya_Gupta_Resume.pdf` with the new PDF, keeping the same file name.

## 4. Edit the words in a case study

Open the story file for that project (for example `js/story-rz.js`). The text is inside quote marks, section by section:

- `h:` is the section heading. Put `[[double brackets]]` around words you want highlighted in blue.
- `lede:` is the short paragraph under the heading.
- `blocks:` hold the content. Each one has a `t:` (type) and its text.

The common block types are:

| Block | What it shows |
| --- | --- |
| `p` | a paragraph |
| `img` | a picture. Needs `src` (file name), `alt` (a short description for screen readers) and optionally `cap` (a caption) |
| `cards` | a grid of small cards. Each is `[small label, heading, text]` |
| `steps` | numbered steps |
| `flow` | a row of boxes joined by arrows |
| `big` | large statement lines |
| `note` | a handwritten-style note |
| `compare` | a before and after slider (used in Virtual Waiter) |

Do not use long dashes (—) in the text. Use a comma, a full stop or a normal hyphen.

## 5. Add a new case study

1. Put the images in a new folder: `assets/projects/<short-name>/` (WebP files, one `cover.webp` plus the figures).
2. In `js/content.js`, copy an existing entry in `projects:`, paste it, and change `slug`, `title`, `blurb`, `cover` and the details. Set `story:` to the same short name.
3. Copy `js/story-nexus.js` to `js/story-<short-name>.js`. Change the `window.STORIES["nexus"]` line to your short name, `base:` to your image folder, and write your sections.
4. In `case.html`, add `<script src="js/story-<short-name>.js"></script>` next to the other story lines.

The easiest way is to ask an AI assistant to do these steps. See section 7.

## 6. Publish your changes

The site is hosted on **Netlify** and rebuilds itself whenever the code on GitHub changes. There is nothing to upload by hand.

**Option A, on the GitHub website (easiest for small edits):**
1. Go to the repo `priyaguptaa19/portfolio` on GitHub.
2. Open the file, click the pencil icon, make your change, then click **Commit changes**.
3. Wait about a minute. The live site updates.

**Option B, from your computer:**
1. Save your changes.
2. Run `git add -A`, then `git commit -m "Describe your change"`, then `git push`.

If a change looks wrong on the live site, open the repo, find the last commit that worked, and ask for help reverting it.

## 7. Using an AI assistant to make changes

Tell it: "Read CLAUDE.md first." That file holds every rule, colour and file location, so it can make changes safely. Tell it to explain what it changed in plain words.

You can say things like "change the headline to …", "add a new case study from these images" or "make the footer line shorter".

## 8. Colours and fonts

At the top of `css/style.css` there is a block called `:root`. The colours there control the whole site. For example, `--accent` is the main blue. Change the code after the colon, such as `#2c44ff`, to a different hex colour. Use only one accent colour so the site stays calm.

### Link preview picture
The picture people see when the link is shared (LinkedIn, WhatsApp, Slack) is `assets/og-image.jpg`, size 1200 by 630. Replace it with a new image of the same name and size to change it. The full site address used in the preview tags is at the top of `index.html` and `case.html`; update it there if the address changes. After changing the picture, refresh LinkedIn's cache at linkedin.com/post-inspector.

## 9. If something breaks

| Problem | Likely cause and fix |
| --- | --- |
| The page is blank | A quote mark, comma or bracket was deleted. Undo (Ctrl+Z). |
| A picture is missing | The file name or folder in the text does not match the file. Check the spelling and capital letters. |
| A case study is blank | Its story file has an error, or `case.html` is missing the script line for it. |
| The live site did not update | Wait two minutes, then check the Deploys tab in Netlify. |
| Animations look odd | Try another browser. Chrome is best. Animations are off if the computer is set to "reduce motion". |

## For developers and AI agents

See [CLAUDE.md](CLAUDE.md) for the file map, design tokens, content model and conventions. `netlify.toml` holds the Netlify settings, and `.github/workflows/deploy.yml` is an optional GitHub Pages deploy.
