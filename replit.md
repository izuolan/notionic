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

Optional: `NOTION_ACCESS_TOKEN` (for private pages).

## Architecture

- **Framework**: Next.js 14.2 (Pages Router), React 19
- **CMS**: Notion via `notion-client` / `react-notion-x` **+ local Markdown files**
- **Styling**: Tailwind CSS **v3** + custom CSS
- **Package manager**: pnpm

## Key Files

| File | Purpose |
|---|---|
| `blog.config.js` | Blog settings (title, author, Notion IDs, features) |
| `pages/index.js` | Home page — reads posts via `getStaticProps` |
| `pages/_app.js` | App shell — Header, Footer, ThemeProvider, NProgress |
| `lib/notion/` | Server-side Notion API helpers |
| `lib/markdown/getAllMarkdownPosts.js` | Reads `content/*.md`, returns same post shape as Notion |
| `lib/markdown/getMarkdownContent.js` | Converts Markdown body to HTML (remark + remark-gfm) |
| `content/` | Local Markdown post files (`slug.md`) |
| `components/Post/NotionRenderer.js` | Dynamic wrapper for react-notion-x |
| `components/Post/MarkdownRenderer.js` | Renders Markdown HTML with `.markdown-body` styles |

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
