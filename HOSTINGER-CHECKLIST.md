# Before deploying to Hostinger

1. Confirm Hostinger is connected to the repo you have updated (previous screenshot: `aliabbasdev1/spr-roofing-nextjs`, `main`).
2. Confirm repository root contains `package.json` and `next.config.ts` — do not upload a ZIP containing an extra nested project folder into a different root.
3. In `next.config.ts`, keep `output: 'export'` and `trailingSlash: true`.
4. Locally run `npm run build` and verify `out/index.html` and `out/contact/index.html` exist.
5. Hostinger build command `npm run build`; output directory `out`; root `./`; Node.js 22.x.
6. Redeploy from updated `main` branch. Check Hostinger build logs for the final **Static export OK** line.
7. Test `https://sprroofing.com.au/contact/` and every service page, then test on mobile.

Phone 0479 083 101 is configured. Verify the business email and that the same number supports WhatsApp, if WhatsApp contact is intended.
