# Notionic Blog — Replit

A Next.js 14 blog that reads content from Notion and local Markdown files.

## Running

The `Start application` workflow runs `pnpm dev` → `next dev -p 5000 -H 0.0.0.0`.

First compile takes ~10–25 seconds. Subsequent page loads are <1 second.

## Environment Secrets Required

| Secret | Purpose |
|---|---|
| `NOTION_PAGE_ID` | Root Notion page with blog posts |
| `NOTION_SPACES_ID` | Notion workspace ID |
| `GITHUB_ID` | GitHub OAuth App client ID (for comments) |
| `GITHUB_SECRET` | GitHub OAuth App client secret (for comments) |
| `NEXTAUTH_SECRET` | Random secret for NextAuth JWT signing |

Optional: `NOTION_ACCESS_TOKEN` (for private pages).

## Architecture

- **Framework**: Next.js 14.2 (Pages Router + App Router for API routes), React 19
- **CMS**: Notion via `notion-client` / `react-notion-x` **+ local Markdown files**
- **Styling**: Tailwind CSS **v3** + custom CSS
- **Comment system**: Fuma Comment with GitHub OAuth (NextAuth v4) and Replit PostgreSQL
- **Package manager**: pnpm

## Key Files

| File | Purpose |
|---|---|
| `blog.config.js` | Blog settings (title, author, Notion IDs, features) |
| `pages/index.js` | Home page — reads posts via `getStaticProps` |
| `pages/_app.js` | App shell — Header, Footer, ThemeProvider, NProgress |
| `pages/api/auth/[...nextauth].js` | NextAuth GitHub OAuth handler |
| `lib/notion/` | Server-side Notion API helpers |
| `lib/auth-options.js` | NextAuth configuration (GitHub provider + JWT + user upsert) |
| `lib/db.js` | Drizzle ORM postgres-js database client |
| `lib/comment-schema.js` | Drizzle schemas for comments, rates, roles, fuma_users |
| `lib/comment-config.js` | Fuma Comment storage + auth adapters |
| `app/api/comments/[[...comment]]/route.js` | Fuma Comment API route handler (App Router) |
| `components/Post/FumaComments.js` | Fuma Comment React widget (dynamically loaded) |
| `components/Post/Comments.js` | Comment provider router (utterances / supacomments / fuma) |
| `styles/fuma-comment.css` | Extracted Fuma Comment styles (Tailwind layers stripped) |
| `lib/markdown/getAllMarkdownPosts.js` | Reads `content/*.md`, returns same post shape as Notion |
| `lib/markdown/getMarkdownContent.js` | Converts Markdown body to HTML (remark + remark-gfm) |
| `content/` | Local Markdown post files (`slug.md`) |

## Comment System Setup

The blog uses **Fuma Comment** for self-hosted comments with GitHub OAuth login.

### GitHub OAuth App setup
1. Go to https://github.com/settings/developers → "New OAuth App"
2. Homepage URL: your blog URL
3. Authorization callback URL: `https://YOUR-REPLIT-DOMAIN/api/auth/callback/github`
4. Copy the Client ID → `GITHUB_ID` secret
5. Generate a Client Secret → `GITHUB_SECRET` secret
6. Generate a random secret (e.g., `openssl rand -base64 32`) → `NEXTAUTH_SECRET`

### Database
Tables are auto-created in Replit PostgreSQL (`DATABASE_URL`):
- `comments` — post comments
- `rates` — likes/dislikes
- `roles` — admin roles
- `fuma_users` — GitHub user profiles (populated on first sign-in)

### Switching comment provider
In `blog.config.js`, change `comment.provider` to:
- `'fuma'` — Fuma Comment (default)
- `'utterances'` — GitHub Issues based
- `'supacomments'` — Supabase based
- `''` — disabled

## Local Markdown posts

Add `.md` files to the `content/` directory. Each file needs frontmatter:

```markdown
---
title: My Post Title
slug: my-post
date: 2026-01-01
tags: [tag1, tag2]
summary: Optional summary
status: Published
type: Post          # Post | Page | Newsletter | Hidden
---

Your content here…
```

Markdown posts appear alongside Notion posts in the home feed, search, and tag pages.

## Migration notes (Vercel → Replit)

Several performance fixes were required to compile in a reasonable time:

1. **Tailwind CSS v4 → v3**: The project was using `@tailwindcss/postcss` (v4) which caused webpack to hang during CSS PostCSS processing. Downgraded to `tailwindcss@3` + `autoprefixer`. Updated `postcss.config.js` and replaced `@import "tailwindcss"` with `@tailwind` directives in `globals.css`.

2. **Heroicons barrel imports → direct imports**: All `@heroicons/react/24/outline` barrel imports were converted to per-icon direct imports (e.g., `import HomeIcon from '@heroicons/react/24/outline/HomeIcon'`) to avoid webpack processing 323 re-exports.

3. **react-notion-x → dynamic import**: `NotionRenderer.js` wraps react-notion-x using `next/dynamic` to prevent the entire ESM package tree from being compiled client-side.

4. **framer-motion removed**: Replaced `motion.div` with regular `div` in Header, Footer, BlogPost, and TransitionEffect components.

5. **Webpack server externals**: Heavy ESM packages (`notion-client`, `got`, `p-map`, etc.) are externalized from the server bundle so webpack doesn't need to bundle them.

6. **Native fetch**: `lib/notion/previewImages.js` uses Node.js native `fetch` instead of `got` (ESM-only) to avoid bundling issues.

7. **Rewrite refactor**: The `next.config.js` rewrites were restructured to use `afterFiles`/`fallback` to prevent the craft.do proxy from intercepting Next.js API routes (`/api/auth/*`, `/api/comments/*`).

8. **Fuma Comment CSS**: The package CSS uses Tailwind `@layer` directives that need special handling. A pre-processed copy (`styles/fuma-comment.css`) with layers stripped is used instead.
