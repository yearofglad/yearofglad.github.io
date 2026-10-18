# benhfu.com

Ben Fu's personal site, used for job hunting and grad school applications. It's a Jekyll site in `docs/`, served by GitHub Pages at benhfu.com (CNAME). Pushing to `main` deploys right away.

## Workflow

- Work one section at a time and check in after each one.
- Preview locally before pushing: `cd docs && bundle exec jekyll serve` (port 4000). There's also a `.claude/launch.json` config named `jekyll`.
- Commit and push to `main` yourself once the user has approved the preview.
- Don't commit `.DS_Store` or `docs/_site/`. `_site/` is tracked by mistake; leave it unstaged.
- GitHub Pages builds with its own old toolchain (github-pages gem: Jekyll 3.10 and Ruby Sass 3.7), not the local Gemfile's Jekyll 4 and Dart Sass. Old Sass rejects some modern syntax. For example, a CSS custom property holding `url(...)` has to be interpolated: `--tile: #{"url('...')"};`.
- Before pushing SCSS changes, compile with Ruby Sass 3.7.4. Install it with `gem install sass -v 3.7.4 --install-dir <scratch>/gems`, then run `sass --load-path docs/_sass` on `main.scss` without its front matter.
- After a push, check the deploy with `gh run list -L 3`. A failed build leaves the previous version live.

## Design source: Figma

- File: "Personal Site", https://www.figma.com/design/YHlL2LoYCuBqcYPtrCfgxK/Personal-Site (page "Website", id 19:3)
- Frames: B Homepage `2112:190`, New Mobile Home Page `2106:98`, 404 `2119:256`, 404 Mobile `2119:285`, Work `2121:356`, Work Mobile `2121:378`, Colophon `2106:133`, Mobile Colophon `2119:238`, Favicon `2121:412`, Assets `2095:30`
- Ignore frames named "ignore"/"Ignore", plus "Old Site" and the old "Home"/"Work" frames at the top of the page.
- "Work" isn't finished yet. Check with the user before building it.
- Pull frames with the Figma MCP `get_design_context` (load the `figma-design-to-code` skill first). Download its assets into `docs/assets/images/papercuts/`, because the Figma asset URLs expire.

## Build order and status

1. Homepage: done, matches Figma.
2. 404 page: done. It's `docs/404.html` on `_layouts/bare.html`, styled in `_sass/notfound.scss`. GitHub Pages serves it for any missing URL. `jekyll serve` only picks it up after a restart, so preview it at `/404.html`. On mobile, every position and font size is a fraction of the panel height (`--h`, the same `min(670px, 100svh - 96px)` as the other pages' cards), so it matches the 404 Mobile frame exactly at 402×874 and scales down evenly on shorter screens.
3. Colophon (`docs/colophon.html`, at `/colophon/`): done, green theme. It uses the desktop wording ("Work Sans and Redaction") on mobile as well, because the Mobile Colophon frame only mentions Redaction.
4. Work (`/work/`): waiting on the finished Figma frame.

The nav already links to `/work/`. That page doesn't exist yet, so the link 404s.

## Code layout (docs/)

- `_layouts/default.html`: the new design's frame. It holds the side paper-cut art, the themed card with the BF monogram, and nav (`_includes/nav.html`, with `aria-current` on the active page). Page content goes inside the card.
- `_includes/head.html`: meta tags, favicons and `main.css`. No Bootstrap in the new design.
- `assets/css/main.scss` imports `_sass/fonts.scss` (@font-face rules) and `_sass/site.scss` (all styles).
- `index.html`: homepage content (intro paragraphs and the martial-arts paper cut in a `<picture>` with a mobile source).
- Per-page front matter:
  - `theme:` is `pink` (default) or `green`. It sets `html.theme-*`, which fills the CSS variables `--bg`, `--accent`, `--muted`, `--ink` and `--tile` in site.scss. It also picks `bf-patch-<theme>.svg`, the little patch behind BF on mobile.
  - `border:` is the desktop side art (default `musicians-border`). Sizes live in `_data/papercuts.yml`.
- On the illustration `<picture>`, set `--art-h` and `--art-mh` to the artwork's Figma heights (desktop and mobile). Desktop height scales with the viewport.
- Tiles are named by color: `floral-tile-pink.svg`, `floral-tile-green.svg`, `floral-tile-red.svg` (404).
- Breakpoint: below 900px is mobile (`$mobile` in site.scss). Mobile stacks the card on top, with the nav in a patterned band underneath.
- On mobile, sizes shrink with `svh` so the nav row is visible without scrolling on modern phones (checked at 393×659 Safari through 430×739). At 402×874 they match Figma exactly. Old small phones like the SE (375×553) still scroll a little.
- Desktop sizes scale with viewport height (`vh` in `clamp()`) so the page fits without scrolling on laptops (checked at 1280×720 to 1512×982). Keep that when adding pages.
- BF monogram is larger than the nav: about 95px vs 42px on a laptop, and 76px vs 32px on mobile.

## Design tokens

- Pink theme (home):
  - pink `#f2dedd` (card and page background)
  - red `#ef3e41` (BF, active nav, art)
  - rose `#db7f8e` (inactive nav)
  - ink `#481314` (body text)
- Green theme (colophon):
  - background `#f1f2dd`
  - accent `#085b0c`
  - inactive nav `rgba(0,16,17,.41)`
  - ink `#09282c`
- 404 page: red panel `#ef3e41` on a rose `#db7f8e` background, numerals `#c31638`
- Fonts:
  - Work Sans for body text
  - Redaction 10 for display text (BF, nav, 404 numerals)
  - Redaction 50 for the 404 headings
- Font files are in `assets/fonts/`.

## Archives (keep them)

- `/oldhome`: an older easter-egg page, now on `_layouts/archive2025.html`.
- `/home2025`: static snapshot of the 2025 homepage (`home2025.html` plus `assets/archive/2025/`). Don't edit it.
- The old fonts and images in `assets/` are used by these archives. Don't delete them.
- The repo root has a Hello-World `index.html` plus `archive/` and `docs2/`. Leave these alone unless the user decides otherwise.

## Content facts

- Ben is in the MSCS program at Columbia (undergrad there too).
- Email: bhf2117@columbia.edu. LinkedIn: https://www.linkedin.com/in/benhfu/. GitHub: yearofglad.
