# james-duran.com

Next.js (App Router, TypeScript) portfolio. No database, no API keys.

## Edit the content
All text, project details, links, and the ticker live in `lib/site.ts`.
Styles are in `app/globals.css`. Page layout is `app/page.tsx`.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Deploy to Vercel
1. Push this folder to a GitHub repo (for example `azrealjames/james-duran-site`).
2. In Vercel, choose Add New > Project, import the repo, and keep the defaults.
3. Under Settings > Domains, add `james-duran.com` and `www.james-duran.com`.
   If the domain is already attached to the old project, remove it there first.
