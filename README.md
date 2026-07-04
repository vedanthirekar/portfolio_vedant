# The Observable Portfolio

Vedant Hirekar's portfolio — built as a piece of software that shows its own
engineering instead of just describing it. The site publishes its CI/CD
pipeline state live, generates its changelog from git history, documents its
own architecture, and serves its content through a public JSON API.

Full design rationale: [`/how-this-works`](https://vedanthirekar.netlify.app/how-this-works) on the live site.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Vitest · GitHub Actions → Vercel

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # vitest
npm run lint
npm run build   # bakes build-info.json via prebuild
```

## Pipeline

Every push to `main` runs `.github/workflows/deploy.yml`: lint → test → build
→ deploy (prebuilt) to Vercel. The ops panel on the site reports on this exact
pipeline — build metadata (commit, deploy number, test counts) is baked into
the artifact by `scripts/build-info.mjs`, and live run status comes from the
GitHub API at request time.

### Required repository secrets

| Secret | Purpose |
| --- | --- |
| `VERCEL_TOKEN` | Vercel CLI auth for prebuilt deploys |
| `VERCEL_ORG_ID` | Vercel scope |
| `VERCEL_PROJECT_ID` | Vercel project |

### Optional Vercel env vars

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Raises GitHub API rate limits for the ops panel / changelog |
| `NEXT_PUBLIC_SITE_REPO` | Overrides the `owner/name` repo shown and queried |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |

Vercel's git integration should stay **disabled** — GitHub Actions owns the
deploy, which is the point.
