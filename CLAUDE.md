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
- Markets: Fort Lauderdale (HQ, full-time crew + house inventory), Miami (established),
  West Palm Beach (established) — full-time staff + hotel contracts.
  Denver (established) — full-time crew based in Denver AND house inventory stocked in the market,
  serving the whole metro, with MULTIPLE standing hotel partnerships (a further contract was
  signing the week of Aug 3 2026). Crew and inventory grow with each new property. "Full-time
  crews and house inventory" is ACCURATE for Denver — confirmed by owner 2026-08-01.
  (Do not re-soften this; a previous pass wrongly downgraded it.)
  Owner has NOT approved naming any individual Denver property on the site — keep it generic.
  Boston (established, UPDATED 2026-08-01) — full-time crew and house inventory owned by Ynvents
  and based in New England, plus established industry partners in the market. The old rule here
  said Boston was a "growing market only, do not claim full-time crew" — owner confirmed on
  2026-08-01 that this is out of date and the crew/inventory are Ynvents' own. Boston now gets
  the same footprint language as Denver and South Florida.
  RECONFIRMED 2026-08-02: a session brief again asserted "Boston is an expanding market only".
  Owner confirmed that brief was stale and this section is correct. Boston keeps full-footprint
  language. Do not downgrade it without a fresh, explicit instruction that references this line.
- Individual hotel/property names are NEVER published for ANY market without the owner's explicit
  approval, regardless of how well established the market is.
- NEVER invent client names, venue names, past jobs, headcounts, or numbers. Where city pages
  need depth, they use (a) public facts about the city's event market and (b) clearly-framed
  representative scenarios ("what a typical X looks like") — never claimed past work.
- Hotel partners named on site: Marriott, Hilton, Driftwood ("and much more") — BRANDS only.
  Individual properties are NOT named publicly (the venue-partner model is white-label, so naming
  a specific hotel may cut against it). Owner must approve before any property name goes on the site.
- Testimonial: Canopy by Hilton (real, provided by client — do not alter wording)
- YnventsIQ is NOT mentioned anywhere on this website. Removed 2026-08-06 at the owner's
  instruction: the dedicated page, the nav link, the homepage section, the dashboard screenshot,
  the platform video and poster, and video.js all went. `/ynventsiq` and `/ynventsiq.html`
  301-redirect to the homepage via vercel.json. Do not reintroduce it — no nav link, no homepage
  panel, no footer mention — unless the owner asks.
  Context: the platform was renamed VenWeave (venweave.com) and now markets itself on its own
  domain, so ynvents.com no longer carries it. Everything removed is recoverable from git history
  (last present at commit 83aecc5) and on the local branch `backup/iq-removal`.
- Instagram: instagram.com/ynventsuccess
- Google Business: https://maps.google.com/?cid=14696655073350239468
- Web3Forms access key (both forms use the same key): 739d733c-2d32-4bd8-90fb-e9c1852ef2ba

## Brand / design system
- Colors: ink #211D1A, paper #F7F2E9, paper-2 #EFE7D8, pink/accent #D71955, gold #BFB6A3
- Fonts: Fraunces (serif, headings/eyebrows) + Work Sans (body), loaded via Google Fonts
- Logo: SVG at /assets/logo-lockup.svg (wordmark) and icon-black.svg / icon-paper.svg (mark only,
  for dark/light backgrounds respectively)
- All styling lives in one shared file: /assets/site.css — no per-page CSS
- **site.css is cache-busted by content hash.** Every page links it as
  `/assets/site.css?v=<first 8 chars of its sha256>`. vercel.json caches /assets for 600s in the
  browser, so without this a CSS change takes up to 10 minutes to reach a returning visitor —
  which is exactly how the stretched-portfolio fix appeared not to work on 2026-08-06.
  **After ANY edit to site.css, regenerate the hash on all pages, in the repo root:**
  ```
  HASH=$(sha256sum assets/site.css | cut -c1-8) && perl -i -pe "s{/assets/site\.css\?v=[a-f0-9]+}{/assets/site.css?v=$HASH}" *.html
  ```
  To check it is current (the two lines must match):
  ```
  sha256sum assets/site.css | cut -c1-8; grep -h -o 'site\.css?v=[a-f0-9]*' index.html | head -1
  ```
  A stale hash is silent — the page keeps working, it just serves old CSS to repeat visitors.
- /assets/forms.js is NOT yet cache-busted and carries the same 600s lag. Worth the same
  treatment if it is ever edited.

## Site structure
- 7 core pages: index, services, venue-partners, portfolio, virtual-hybrid, get-a-quote, careers
- Nav carries 4 links (Services, Venue Partners, Portfolio, Careers) plus the Get a Quote button
- 5 city landing pages: fort-lauderdale, miami, west-palm-beach, denver, boston (SEO/local-search pages)
- Shared nav across all pages (no nav link to city pages — they're linked via footer "Serving:" list)
- Footer includes locations list + phone + social links + copyright, byte-identical on every page
- Forms (get-a-quote, venue-partners) submit via Web3Forms — logic in
  /assets/forms.js, no page reload. forms.js binds to every `form[data-web3form]`, so a new form only
  needs that attribute, an access_key hidden input, and the page must load /assets/forms.js.
- Cautionary tale worth keeping: the old YnventsIQ waitlist was a DEAD form for its whole life — a
  bare <div class="waitlist-form"> holding an unnamed input and a type-less button, on a page that
  never loaded forms.js. Every "Join the Waitlist" click silently discarded the email. If you add a
  form, verify it actually posts before shipping it.
- Success copy is per-form: forms.js reads `data-success` off the form and falls back to the default
  "we will follow up within one business day" line. The waitlist sets its own, because that default
  promises a response time the waitlist does not offer. Keep the .waitlist-form flex row as an inner
  div — the <form> wraps it, so .form-result lands below the row instead of inside it.

### City page anatomy (rebuilt 2026-08-01 — keep this shape for any new city page)
Each city page runs: hero (with tel: CTA) → service-row with a city-specific H2 → "The Market"
(3 `.local-map` zones describing that city's real event geography) → "Representative Build"
(`.runsheet` — a clearly-framed typical event, NOT a claimed past job) → "Go Deeper" (4 `.link-card`
internal links) → city FAQ (5 items) → final CTA with tel: → footer.
Each page runs a DIFFERENT representative scenario so the pages don't converge again:
Fort Lauderdale = 300-person general session, Miami = hybrid conference, West Palm Beach = 250-guest
gala, Denver = multi-day conference with breakouts, Boston = first-event onboarding process.
~800 words each; only the 4 link-cards and the closing tagline are shared prose.

## SEO
- Every page has unique meta description, OG tags, canonical URL, and a viewport meta tag
  (the viewport tag was missing sitewide until 2026-08-01 — do not drop it, mobile layout dies without it)
- og:image is per-page, not one shared image
- Homepage + all 5 city pages: LocalBusiness JSON-LD with postal address, sameAs (Instagram +
  Google Business), logo, foundingDate, hasOfferCatalog
- City pages additionally carry BreadcrumbList and FAQPage JSON-LD
- Every indexable page now carries BreadcrumbList (Home > Page). Only index.html (it IS the root) and
  404.html (noindex) are exempt — do not add one to either.
- robots.txt + sitemap.xml at site root, must be updated if pages are added/removed
- 404.html at root — Vercel serves it automatically on a 404. Carries noindex, real nav/footer,
  and four recovery link-cards. Keep it OUT of sitemap.xml.

### Images (rebuilt 2026-08-02 — do not regress this)
Every photo is hotlinked from static.wixstatic.com. They were previously linked at FULL original
resolution: the homepage hero alone was 16.9 MB and portfolio.html shipped 33.9 MB across 24 images,
which destroyed LCP and pushed og:image past the ~8 MB limit where Facebook/LinkedIn stop generating
previews entirely. Every URL now carries a Wix CDN transform and the whole site is ~3.9 MB.
NEVER add a bare wixstatic URL. Always append a transform, matched to the CSS container:
  .hero-photo   (aspect 4/5)  -> /v1/fill/w_1000,h_1250,al_c,q_80,enc_auto/<name>  width=1000 height=1250
  .service-photo(aspect 4/3)  -> /v1/fill/w_1000,h_750,al_c,q_80,enc_auto/<name>   width=1000 height=750
  .brand-ext .photo (1/1)     -> /v1/fill/w_800,h_800,al_c,q_80,enc_auto/<name>    width=800  height=800
  .masonry .item (natural AR) -> /v1/fit/w_800,h_1600,q_80,enc_auto/<name>  + the REAL output w/h
  og:image / JSON-LD "image"  -> /v1/fill/w_1200,h_630,al_c,q_80,enc_auto/<name>
Full URL shape is /media/<name>/v1/<spec>/<name> — the filename repeats. enc_auto content-negotiates
AVIF/WebP. Masonry MUST use fit (not fill) or the column layout collapses to a uniform grid; get its
width/height by fetching the transformed file and reading actual dimensions, never by guessing.
Every <img> carries width+height (CLS). The homepage hero is fetchpriority=high and never lazy (LCP).

**The trap those width/height attributes set (hit on 2026-08-06):** the HTML `width`/`height`
attributes are presentational hints, i.e. real CSS width/height. If a rule sets `width` but not
`height`, the attribute's height wins and the image is DISTORTED — not merely mis-sized.
`.masonry .item img` was `width:100%` with no height, so every portfolio photo rendered at
column-width x its full attribute height (an 800x600 shown at 583x600). Fixed by adding
`height:auto`. Any rule that sizes an <img> must ALSO state a height — `height:auto` to keep the
natural ratio, or `height:100%` with `object-fit:cover` to crop deliberately, which is what
`.service-photo img`, `.brand-ext .photo img` and `.hero-photo img.bg` already do. Verified
2026-08-06 that no other image on any page is height-locked to its attribute.

### Video / heavy media — none currently

There are no video or raster-photo binaries in this repo. There was one: a 2.31 MB YnventsIQ
platform MP4 plus a poster and a dashboard screenshot, all removed 2026-08-06 with the rest of
the YnventsIQ material. Recover from commit 83aecc5 if ever needed.

Two things from that work worth keeping, if video is ever added again:

- Serve it with `preload="none"` and a poster <button> overlay rather than autoplay. The original
  16.5 MB file would otherwise download on every single visit and undo all the image optimisation
  documented above. Give the frame a fixed aspect-ratio so nothing shifts while it is unloaded.
- The compression recipe that got 16.5 MB down to 2.31 MB at SSIM 0.9958 (visually identical, 86%
  smaller) for flat UI motion:
    ffmpeg -c:v libx264 -profile:v high -preset slow -tune animation -crf 24 -pix_fmt yuv420p -an -movflags +faststart
  `+faststart` puts the moov atom near byte 0 so it streams rather than waiting on a full download.
  CRF 27 and 30 were also measured and are fine if size ever outweighs text crispness.

### Structured data model (restructured 2026-08-02)
There is ONE business entity: LocalBusiness @id https://www.ynvents.com/#business, defined on the
homepage. Previously all 5 city pages ALSO declared full LocalBusiness nodes sharing the same phone
and Fort Lauderdale address — 6 duplicate entities Google may collapse or discount. City pages and
service pages now use Service with areaServed + provider {"@id": ".../#business"} referencing that
one entity. Do not add another LocalBusiness node anywhere. City pages keep BreadcrumbList + FAQPage.

## Known open items
- Careers page "View & Apply" button is a dead `#` link — needs a real posting/ATS link from owner
- Canopy by Hilton testimonial appears only on the homepage. It should also go on the city page for
  whichever property it came from — ASK the owner which one; do not guess.
- Homepage stat block claims "4 Hotel Markets Under Contract" — unverified, confirm before editing near it
- Hero image and some page photos are still stock/generic Wixstatic assets from the old site — owner
  may want to swap in real event photography later. They are now served through the Wix CDN at sane
  sizes (see Images above), so this is a content question, not a performance one. Note the site still
  depends on static.wixstatic.com staying up; self-hosting them under /assets is the durable fix.
- No city landing pages for Cocoa Beach or Orlando, though both are active outreach markets
  (owner deferred these on 2026-08-01)
- No formal design system doc beyond this file + site.css itself

## Working conventions
- This is a flat static site — no build step, no framework. Just write HTML/CSS/JS directly.
- vercel.json (added 2026-08-02) holds cache headers for /assets, security headers, and 12 explicit
  extensionless->.html 308 redirects (/miami -> /miami.html) so bare URLs resolve. Deliberately does
  NOT use Vercel cleanUrls: that inverts the redirect and would 308 every .html URL, breaking every
  canonical, og:url, sitemap entry and internal link at once. The .html form stays canonical.
  Add a redirect entry whenever a new page is added.
- Files are CRLF. Keep it that way, or diffs blow up to whole-file rewrites.
- No inline layout CSS. `get-a-quote.html` had an inline `display:grid` that silently bypassed the
  responsive rules in site.css and broke the form on mobile — that's the failure mode to avoid.
- Keep the shared nav/footer markup byte-identical across pages when adding a new page — copy from
  an existing page rather than retyping by hand (this caused real bugs during initial build).
- Any push to `main` on GitHub deploys straight to production (ynvents.com) — no staging environment,
  so double check changes before pushing, especially copy changes involving business facts above.
