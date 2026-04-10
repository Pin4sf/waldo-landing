# Waldo Waitlist: Log And Plan

## Plan

1. Use Figma as the source of truth for layout, spacing, colors, typography, and SVG assets.
2. Scaffold a fresh Next.js App Router app with Tailwind CSS and exact brand tokens.
3. Implement the single-screen waitlist page with three in-place states:
   - Default
   - Error
   - Success
4. Add email validation with a valid `@` + TLD check.
5. Add 300ms fade transitions between states.
6. Add disabled navbar items with hover tooltips.
7. Verify desktop parity first, then verify the page still holds together at mobile width.
8. Deploy to Vercel and bind `heywaldo.in`.

## Log

### Figma extraction

- Pulled the Figma metadata and design context for:
  - `332:6584` `Default State`
  - `332:6649` `Error state`
  - `332:6629` `Success State`
- Resolved the copy conflict by following Figma for the success state instead of the written spec.
- Extracted the exact Figma SVG assets:
  - `public/assets/waldo-logo.svg`
  - `public/assets/dalmatian-default.svg`
  - `public/assets/dalmatian-error.svg`
  - `public/assets/dalmatian-success.svg`

### App setup

- Built the app from scratch in this folder.
- Added:
  - `package.json`
  - `tsconfig.json`
  - `next.config.ts`
  - `postcss.config.mjs`
  - `app/layout.tsx`
  - `app/page.tsx`
  - `app/globals.css`
  - `components/waldo-waitlist.tsx`
- Installed dependencies and verified local production builds.

### Implementation

- Implemented the page as one screen with no routing.
- Implemented all three states using a shared component and state transitions.
- Added email validation with:
  - invalid or empty email -> error state
  - valid email -> success state
- Added 300ms fade behavior using a half-out / half-in transition.
- Added disabled nav buttons and tooltip copy.
- Tuned typography and layout to better match Figma.
- Switched fonts from `next/font/google` to local font files because sandboxed builds could not fetch Google Fonts:
  - `app/fonts/corben-400.ttf`
  - `app/fonts/dm-sans-400.ttf`
  - `app/fonts/dm-sans-500.ttf`
  - `app/fonts/dm-sans-400-italic.ttf`

### Local verification

- Verified local build succeeds with `npm run build`.
- Verified local states in browser:
  - default state
  - error state
  - success state
- Did a mobile fit pass and widened the mobile input so the placeholder no longer clips.

### Vercel deployment

- Logged into Vercel scope: `suyashpingale19-1210`
- Created project: `heywaldo-in`
- Linked this folder to that Vercel project.
- Production deployment created:
  - `https://heywaldo-1tqghuqwz-suyashpingale19-1210s-projects.vercel.app`
- Public production deployment created:
  - `https://heywaldo-eshb425bz-suyashpingale19-1210s-projects.vercel.app`
- Project alias reported by Vercel:
  - `https://heywaldo-in.vercel.app`
- Custom domain added in Vercel:
  - `https://heywaldo.in`

## Current Status

### Working

- Local app works.
- Local production build works.
- Vercel project exists.
- Custom domain is attached in Vercel.

### Blocked

- `heywaldo.in` is not live yet because DNS is still pointing at GoDaddy parking, not Vercel.
- Current DNS state observed from Vercel:
  - Intended nameservers:
    - `ns1.vercel-dns.com`
    - `ns2.vercel-dns.com`
  - Current nameservers:
    - `ns65.domaincontrol.com`
    - `ns66.domaincontrol.com`
- Vercel also recommended setting:
  - `A heywaldo.in 76.76.21.21`
- `https://heywaldo.in` currently fails SSL because the domain has not fully switched over yet.
- `http://heywaldo.in` still resolves to the GoDaddy parked landing page.

## Next Steps

1. Update DNS for `heywaldo.in` at the registrar:
   - either point the apex record to `76.76.21.21`
   - or move nameservers to Vercel
2. Wait for Vercel SSL issuance to complete after DNS is correct.
3. Re-test:
   - `https://heywaldo.in`
   - default state
   - error state
   - success state
4. If `heywaldo-in.vercel.app` still returns `404`, inspect alias/project routing after the domain goes live, since the custom domain is now the primary target Vercel reported during the public deployment.

## Useful Commands

```bash
npm install
npm run dev -- --hostname 127.0.0.1 --port 3000
npm run build
vercel project inspect heywaldo-in
vercel domains inspect heywaldo.in
```
