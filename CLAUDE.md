# Ynvents Media Group Website — Project Context

Static HTML/CSS/JS site for Ynvents Media Group, an event technology (AV) company.
Deployed via GitHub → Vercel. Repo IS the deploy source — push to `main` deploys to production automatically.

## Live site
- Production: https://www.ynvents.com (and https://ynvents.com)
- Vercel project: `ynvents-redesign`, team `Ynvents` (team_pMRi3jVaZQBwpt7p9vSiXboS)
- GitHub: khanyameen91-lang/Ynvents-Media-Group, branch `main`

## Business facts (don't invent/change without asking)
- Full name: Ynvents Media Group Inc., est. 2016
- HQ: Fort Lauderdale, FL. Phone (754) 400-0067. Email info@ynvents.com
- Markets: Fort Lauderdale (HQ, full-time crew), Miami (established), West Palm Beach (established),
  Denver (established) — all full-time staff + hotel contracts.
  Boston is a GROWING market only — do not claim same footprint as the others. Frame honestly
  ("now serving," "expanding into") not "full-time crew" language.
- Hotel partners named on site: Marriott, Hilton, Driftwood ("and much more")
- Testimonial: Canopy by Hilton (real, provided by client — do not alter wording)
- YnventsIQ: internal AV-business management platform, in production internally, not yet licensed externally
- Instagram: instagram.com/ynventsuccess
- Google Business: https://maps.google.com/?cid=14696655073350239468
- Web3Forms access key (both forms use the same key): 739d733c-2d32-4bd8-90fb-e9c1852ef2ba

## Brand / design system
- Colors: ink #211D1A, paper #F7F2E9, paper-2 #EFE7D8, pink/accent #D71955, gold #BFB6A3
- Fonts: Fraunces (serif, headings/eyebrows) + Work Sans (body), loaded via Google Fonts
- Logo: SVG at /assets/logo-lockup.svg (wordmark) and icon-black.svg / icon-paper.svg (mark only,
  for dark/light backgrounds respectively)
- All styling lives in one shared file: /assets/site.css — no per-page CSS

## Site structure
- 8 core pages: index, services, venue-partners, portfolio, virtual-hybrid, get-a-quote, careers, ynventsiq
- 5 city landing pages: fort-lauderdale, miami, west-palm-beach, denver, boston (SEO/local-search pages)
- Shared nav across all pages (no nav link to city pages — they're linked via footer "Serving:" list)
- Footer includes locations list + social links + copyright, identical block on every page
- Forms (get-a-quote, venue-partners) submit via Web3Forms — logic in /assets/forms.js, no page reload

## SEO
- Every page has unique meta description, OG tags, canonical URL
- Homepage + all 5 city pages have LocalBusiness JSON-LD structured data
- robots.txt + sitemap.xml at site root, must be updated if pages are added/removed

## Known open items (not yet done, low priority per owner)
- Careers page "View & Apply" button is a dead `#` link — needs a real posting/ATS link
- Hero image and some page photos are stock/generic Wixstatic URLs from the old site — owner may
  want to swap in real event photography later
- No formal design system doc beyond this file + site.css itself

## Working conventions
- This is a flat static site — no build step, no framework. Just write HTML/CSS/JS directly.
- Keep the shared nav/footer markup byte-identical across pages when adding a new page — copy from
  an existing page rather than retyping by hand (this caused real bugs during initial build).
- Any push to `main` on GitHub deploys straight to production (ynvents.com) — no staging environment,
  so double check changes before pushing, especially copy changes involving business facts above.
