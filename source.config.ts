import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
  applyMdxPreset
} from 'fumadocs-mdx/config'
import { z } from 'zod'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export const posts = defineCollections({
  type: 'doc',
  dir: 'content/posts',
  schema: frontmatterSchema.extend({
    date: z.union([z.string(), z.date(), z.number()]).optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    status: z.enum(['Published', 'Draft']).default('Published'),
    type: z.enum(['Post', 'Page', 'Newsletter', 'Hidden']).default('Post'),
    cover: z.string().optional(),
    fullWidth: z.boolean().default(false)
  }),
  mdxOptions: applyMdxPreset({
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight]
  })
})

export default defineConfig({})
