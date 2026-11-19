# Notionic Blog

A Next.js blog that renders local Markdown/MDX via Fumadocs, with the classic Notionic layout.

## Running

```bash
pnpm install
pnpm dev
```

## Environment Secrets

| Secret | Purpose |
|---|---|
| `GITHUB_ID` | GitHub OAuth App client ID (for comments) |
| `GITHUB_SECRET` | GitHub OAuth App client secret (for comments) |
| `NEXTAUTH_SECRET` | Random secret for NextAuth JWT signing |
| `DATABASE_URL` | Postgres for Fuma Comment |
| `TELEGRAM_TOKEN` | Optional contact form bot |

## Architecture

- **Framework**: Next.js 16 (App Router), React 19.2
- **Content**: Fumadocs MDX (`content/posts`)
- **Styling**: Tailwind CSS v3 + custom CSS (`.markdown-body`)
- **Comments**: Fuma Comment with GitHub OAuth (NextAuth v4)
- **Notes archive**: Craft.do share API (unchanged)

## Key Files

| File | Purpose |
|---|---|
| `blog.config.js` | Blog settings |
| `source.config.ts` | Fumadocs MDX collection schema |
| `lib/source.ts` / `lib/posts.js` | Content loader + post helpers |
| `app/` | App Router pages |
| `middleware.js` | Locale rewrite (`/zh/...`) |
| `content/posts/` | Markdown / MDX posts |
