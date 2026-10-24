# Juniper — transfer and run

Affiliate storefront (Juniper). This folder is the website source for
https://github.com/RigMo-del/juniper-site

The live site was not changed. Passwords, API keys, and the preview OAuth
client secret were left out. `PREVIEW_CLIENT_SECRET` in
`src/lib/auth/preview.ts` is an empty string. Fill in your own values in a
local `.env` file (see `.env.example`). Do not commit `.env`.

## What is included

- Pages and routes: `src/routes/`
- Components: `src/components/`
- Styles: `src/styles.css` (Tailwind CSS v4)
- Images and public files: `public/` (product photos, favicon, share card)
- Dependencies: `package.json` and `package-lock.json`
- Config: `vite.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc`, `netlify.toml`
- Server helpers, scripts, and SQL migrations

`node_modules/` is not included. Install it with `npm install`.

## Put these files in the GitHub repo

On a computer:

```bash
git clone https://github.com/RigMo-del/juniper-site.git
cd juniper-site
# unzip this archive and copy its contents into this folder
# (do not nest a second juniper-site folder)
git add .
git commit -m "Add Juniper website source"
git push
```

On a phone, GitHub’s website can upload files, but a full project is easier
from a computer. Upload the unzipped files, not this zip as a single file.

## Run locally

Requires Node.js 22: https://nodejs.org

```bash
npm install
npm run dev
```

Open http://localhost:8080

Stop the server with Ctrl+C.

`.grok/app-env.json` sets `VITE_AUTH_ENABLED` to false so the shop stays open
without a login.

## Deploy to Netlify

The project is configured for Netlify using the official `@netlify/vite-plugin-tanstack-start`.

1. Connect the GitHub repository to a Netlify site.
2. Set the build command to `npm run build` (or rely on `netlify.toml`).
3. Set the publish directory to `dist/client` (or rely on `netlify.toml`).
4. In Site settings → Environment variables, set:
   - `VITE_OWNER_AFFILIATE_TAG=juniperfinds6-20` (optional; code defaults to this approved Juniper ID when unset or invalid)
   - `VITE_AUTH_ENABLED=false`
   - Any other values from `.env.example` as needed.
5. Deploy. SSR, product pages, images, and PWA middleware (via Nitro `serverDir`) are preserved.

Do not deploy or consume credits without explicit approval. Demonstration products remain non-purchasable.
