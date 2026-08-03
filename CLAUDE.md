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
- YnventsIQ: internal AV-business management platform, in production internally, not yet licensed
  externally. The homepage badge and the ynventsiq.html badge must agree. As of 2026-08-02 the
  homepage said only "Coming Soon" while ynventsiq.html said "Live in Production — Licensing Coming
  Soon"; the homepage now reads "YnventsIQ — Live in Production" and the lead below it carries the
  licensing timing. Keep the homepage badge SHORT — it wraps inside its pill on mobile past ~30 chars.
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
- Footer includes locations list + phone + social links + copyright, byte-identical on every page
- Forms (get-a-quote, venue-partners, ynventsiq waitlist) submit via Web3Forms — logic in
  /assets/forms.js, no page reload. forms.js binds to every `form[data-web3form]`, so a new form only
  needs that attribute, an access_key hidden input, and the page must load /assets/forms.js.
- The YnventsIQ waitlist was a DEAD form until 2026-08-02: a bare <div class="waitlist-form"> holding
  an unnamed input and a type-less button, on a page that never loaded forms.js. Every "Join the
  Waitlist" CTA silently discarded the email. If you add a form, verify it actually posts.
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

### Video (added 2026-08-02)
/assets/ynventsiq-platform.mp4 - 2.31 MB, 1280x720, 52s, H.264, NO audio track. It replaced the
hand-coded .browser-frame fake dashboard that used to sit on ynventsiq.html (that mock had invented
dollar figures in it). This is the only binary of real weight in the repo - keep it that way.
It is presented via .video-frame in site.css + /assets/video.js:
  - preload="none" so the 16.5 MB is NOT fetched on page load. VERIFIED: before any click the
    element sits at readyState 0 (HAVE_NOTHING), duration NaN, 0 buffered ranges. Do not change
    preload, and do not add autoplay - either one re-introduces a 16.5 MB download on every visit
    and undoes the image work above.
  - a .video-poster <button> overlays the frame (brand-pink play control). video.js hides it on
    click, adds native controls, plays, and restores the poster on ended.
  - .video-frame is aspect-ratio 16/9 so there is no layout shift while nothing is loaded.
Source: the video is rendered from the Claude Design project "YnventsIQ Platform Hype Video"
(claude.ai/design, 12 scenes x SceneStage, 52s). That project is the EDITOR - re-render and re-export
the MP4 there, do not try to run its .dc.html on this site (it needs React + the design-host runtime,
and this site has no build step). Its data is fictional: clients "K. Ramsey"/"M. Ortiz"/"D. Foster"/
"J. Coleman", venue "Riverfront Grand Hotel" - no real property names, which is why it is publishable.

Compressed 2026-08-02 with ffmpeg from a 16.5 MB original (2644 kbps, wasteful for flat UI motion):
  -c:v libx264 -profile:v high -preset slow -tune animation -crf 24 -pix_fmt yuv420p -an -movflags +faststart
Result 2.31 MB, SSIM mean 0.9958 / worst frame 0.9908 vs the original - an 86% cut at visually
identical quality. +faststart puts moov at byte 36 so it streams instead of waiting for a full
download. Re-run these exact flags on any future re-export; CRF 27 (1.74 MB) and 30 (1.27 MB) were
also measured and are fine if size ever matters more than text crispness.

Poster: /assets/ynventsiq-platform-poster.jpg is the opening title card grabbed at t=2s, so the still
matches frame 0 of the loop and the swap to playback is seamless. Because a real thumbnail now
exists, ynventsiq.html carries VideoObject JSON-LD. If the video is re-exported, re-grab the poster
or the schema thumbnail stops matching the content.

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
