import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

const contentDir = path.join(process.cwd(), 'content')

/**
 * Build a map of { [frontmatterSlug]: absoluteFilePath } for all .md files.
 * Falls back to the filename slug when no frontmatter slug is declared.
 */
function buildSlugFileMap() {
  if (!fs.existsSync(contentDir)) return {}

  const map = {}
  for (const filename of fs.readdirSync(contentDir)) {
    if (!filename.endsWith('.md')) continue
    const filePath = path.join(contentDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const slug = data.slug || filename.replace(/\.md$/, '')
    map[slug] = filePath
  }
  return map
}

export async function getMarkdownContent(slug) {
  const slugMap = buildSlugFileMap()
  const filePath = slugMap[slug]
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return result.toString()
}
