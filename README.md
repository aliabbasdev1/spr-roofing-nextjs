# SPR Roofing Group — sprroofing.com.au

Next.js 16 (App Router) site, exported as a fully static site. Hostinger serves plain HTML/CSS/JS from `out/`, so no Node server runs in production.

## Hostinger settings

| Setting | Value |
|---|---|
| Framework / application type | **Static / Other**. The "Next.js" preset can switch off the static export. `scripts/build.mjs` protects against it, but Static is the right setting. |
| Build command | `npm run build` |
| Output directory | `out` |
| Node.js | 22.x (20.9+ works) |

Push to the connected branch → Hostinger builds and deploys. The build fails on purpose (`scripts/verify-export.mjs`) if any page, the phone number, an H1, a canonical link, the sitemap or robots file is missing.

## Commands

```bash
npm install
npm run dev        # local development  → http://localhost:3000
npm run build      # production static build → out/
npm start          # preview the built site (gzip on) → http://localhost:3000
npm run images     # re-generate optimised images after changing assets-src/
```

## Where to edit things

| What | File |
|---|---|
| Phone, email, WhatsApp, **licence number, ABN** | `src/lib/site.ts` |
| Service pages (all 9) | `src/content/services.ts` |
| Service areas | `src/content/areas.ts` |
| Contact FAQs, process steps, "signs" cards, form options | `src/content/shared.ts` |
| Page titles & descriptions | each `src/app/**/page.tsx` (`pageMetadata`) |
| Styles | `src/app/globals.css` |
| Images | put originals in `assets-src/`, run `npm run images`, commit the results |

Text wrapped in `*asterisks*` in content files renders in the gold gradient.

## What's built in

- **SEO:** unique title/description/canonical on every page, Open Graph and Twitter share image, JSON-LD (RoofingContractor, WebSite, BreadcrumbList, Service, FAQPage, ItemList), `sitemap.xml`, `robots.txt`, web manifest, favicon/Apple icon. The URLs are the same as the previous site's (`/about/`, `/services/roof-leak-repairs/`, …), and `public/.htaccess` 301-redirects old `.html` links.
- **Speed:** static HTML, self-hosted fonts, responsive WebP images with fixed dimensions (no layout shift), and CSS-only hero animation. GSAP and Lenis (smooth scroll) only load on the visitor's first scroll or tap, and never for reduced-motion users.
- **Reliability:** all content is visible without JavaScript, and the phone number and email are in the HTML itself.
- **Accessibility:** skip link, keyboard-friendly menu and accordion, labelled form fields with error messages, WCAG AA contrast.

## Notes

- `scripts/fix-segment-files.mjs` works around a Next 16 bug that only affects **Windows** builds (prefetch files written into nested folders). It does nothing on Hostinger's Linux build.
- The quote form doesn't store anything. It prepares a WhatsApp or email message for the visitor to send.
