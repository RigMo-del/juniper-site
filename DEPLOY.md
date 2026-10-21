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
- Config: `vite.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc`, `vercel.json`
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

## Deploy

The project is set up for Vercel (`vercel.json`). From the project folder,
after `npm install`:

```bash
npm run build
```

Then connect the GitHub repo to a new Vercel project and deploy. Set any
environment variables yourself in the host dashboard. Do not put secrets in
the repository.
