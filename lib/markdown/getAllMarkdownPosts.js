import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dayjs from '@/lib/day'

const contentDir = path.join(process.cwd(), 'content')

export function getAllMarkdownPosts() {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'))

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(contentDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    const rawDate = data.date
    const date = rawDate
      ? dayjs(rawDate).valueOf()
      : fs.statSync(filePath).mtimeMs

    return {
      id: `md-${slug}`,
      title: data.title || slug,
      slug,
      type: data.type ? [data.type] : ['Post'],
      status: data.status ? [data.status] : ['Published'],
      date,
      tags: Array.isArray(data.tags)
        ? data.tags
        : data.tags
          ? data.tags.split(',').map((t) => t.trim())
          : [],
      summary: data.summary || data.description || content.slice(0, 150).replace(/\n/g, ' '),
      page_cover: data.cover || '',
      fullWidth: data.fullWidth || false,
      source: 'markdown'
    }
  })
}
