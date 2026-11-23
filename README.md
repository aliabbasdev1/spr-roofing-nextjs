# SPR Roofing Group — Next.js 15 (App Router)

Native React/TSX conversion of the supplied SPR website. All **14 pages**, assets, styles, 3D Three.js roof story, GSAP ScrollTrigger motion, smooth scrolling, mobile navigation, FAQs, forms, and SEO metadata are included. **No legacy `.html` pages** are retained. Original page text, copy, layout, colors, images and animation logic are preserved.

## Start locally

```bash
npm install
npm run dev
```
Open http://localhost:3000 .

## Build for Netlify

```bash
npm run build
```
Because `output: 'export'` is configured, the finished static site is in the **`out/`** folder. For Netlify connect the repository, build `npm run build`, publish `out`; or drag the generated `out/` folder to Netlify Drop.

To preview a production build, run `npm start`. The included Node.js static server serves `out/` correctly; it does **not** call `next start` (which fails with static export).

## Structure

```text
public/assets/                # supplied photos and logo
src/app/                      # Next.js App Router routes / metadata / sitemap
src/app/services/[slug]/      # 9 service page routes (static generation)
src/components/pages/         # page-by-page React JSX markup
src/components/RouteEffects.tsx
src/lib/home-scene.ts         # original interactive Three.js roof model
src/lib/home-motion.ts        # original GSAP home animation
src/lib/home-interactions.ts  # original homepage form and UI
src/lib/inner-interactions.ts # original inner-page interactions
src/styles/home.css           # unchanged layout CSS, scoped for homepage
src/styles/inner.css          # unchanged layout CSS, scoped for inner pages
```

**Contact data:** The supplied original design contains placeholder phone/WhatsApp/licence/ABN details. The Next.js conversion keeps those values unchanged; update constants in `src/lib/siteDetails.ts` when real details are available. The quote form prepares WhatsApp and email links like the source site; it does not submit to a backend.
