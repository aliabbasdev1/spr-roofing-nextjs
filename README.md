# SPR Roofing Group — Next.js 15 App Router

This is an update to the **existing** `spr-roofing-nextjs` GitHub repository, not a new repository. The original static design/animations/assets are preserved in React TSX. There are no legacy HTML page source files.

## What this update contains

- Dedicated `/contact/` page (already present in the previous ZIP, verified and included).
- All header/menu links to Contact plus an explicit **Contact Us** link in each footer.
- Contact/WhatsApp/telephone values configured in **one** TypeScript file with safe fallbacks, so missing details do not dial a fake number.
- Existing quote forms preserved; WhatsApp + email message links are prepared on submit, but **no server-side form delivery** is implemented.
- Static export verification in `npm run build`, including `out/contact/index.html`.
- SEO sitemap links normalized to `trailingSlash: true` URL paths.
- Preserved GSAP, ScrollTrigger, Lenis, Three.js, images and page components.

## SPR Roofing contact number (configured)

Edit `src/lib/siteDetails.ts`:

```ts
const phoneNumber = '0479 083 101';  // supplied SPR Roofing mobile
const whatsappNumber = '';         // optional different WhatsApp mobile
```

Phone links dial **+61 479 083 101** and display **0479 083 101**. Current contact-link code defaults WhatsApp to the same mobile number; confirm this number supports WhatsApp before advertising that option. Otherwise configure a separate verified WhatsApp number or disable its links.

Also verify the email mailbox `info@sprroofing.com.au` exists and fill in the NSW contractor licence/ABN **only if confirmed**. Blank licence/ABN fields are hidden from the UI.

## Update the existing local Git repository (recommended)

1. In VS Code, open your **existing cloned** repository folder (where `.git` already exists).
2. Extract the **Update-Only ZIP** into that same project folder, overwriting matching files. DO NOT delete `.git`, reinstall Git, or create another repository.
3. The phone number is already updated. Review `src/lib/siteDetails.ts` before going live.
4. Run:

```powershell
npm install
npm run build
Test-Path .\out\contact\index.html
# Must return True

git status
git add .
git commit -m "Improve contact page and hosting static export"
git push origin main
```

If a previous Hostinger deployment reads a **different repository** than the one you push, change the Hostinger Git source to the correct repository and branch first.

## Hostinger Cloud Startup deployment

- Source: correct GitHub repository, branch `main`
- Node: 22.x
- Root directory: `./` if the repository root contains `package.json`
- Build command: `npm run build`
- Output directory: `out` (**not** `.next`)
- Required env vars: none for the current static site

The site uses `output: 'export'` and `trailingSlash: true`. Verify `out/index.html` and `out/contact/index.html` locally before redeploy. The contact form uses email/WhatsApp deep links; static hosting itself does not send email.

## Project structure

```text
public/assets/                       Original photos and logo
src/app/                             Next.js App Router pages / SEO metadata
src/app/contact/page.tsx             Contact page route
src/components/pages/contact.tsx     Contact layout (React JSX, no HTML source)
src/components/pages/                All 14 page view components
src/components/RouteEffects.tsx      Route-specific browser effects
src/lib/siteDetails.ts               SINGLE SOURCE for business contact details
src/lib/contact-links.ts             Safe tel/WhatsApp/mailto setup
src/lib/home-*.ts                     Home motion, Three.js scene, interactions
src/lib/inner-interactions.ts         Inner pages/FAQ/quote forms/motion
src/styles/                          Existing site styles
scripts/verify-export.mjs            Build output check
```

## Known items to finish before going live

1. Phone **0479 083 101** is configured; confirm whether WhatsApp uses this same mobile.
2. Verify `info@sprroofing.com.au` receives email; the form prepares an email but does not automatically submit to a server.
3. NSW contractor licence and ABN, if appropriate and verified.
4. Test the contact form, links, responsive menu and 3D animation on deployed Hostinger site.
5. Verify DNS/SSL and Google Search Console after the site is live.
