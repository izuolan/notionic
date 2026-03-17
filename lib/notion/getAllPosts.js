import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'
import dayjs from '@/lib/day'
import getAllPageIds from './getAllPageIds'
import getPageProperties from './getPageProperties'
import filterPublishedPosts from './filterPublishedPosts'
import {
  normalizeNotionMetadata,
  normalizeCollection,
  normalizeSchema,
  normalizePageBlock
} from './normalizeNotionData'
import { getAllMarkdownPosts } from '@/lib/markdown/getAllMarkdownPosts'

/**
 * @param {{ onlyNewsletter: boolean }} - false: all types / true: newsletter only
 * @param {{ onlyPost: boolean }} - false: all types / true: post only
 * @param {{ onlyHidden: boolean }} - false: all types / true: hidden only
 */
export async function getAllPosts({
  onlyNewsletter = false,
  onlyPost = false,
  onlyHidden = false
}) {
  // Always load and filter Markdown posts — they work without Notion
  const markdownRaw = getAllMarkdownPosts()
  const markdownPosts = filterPublishedPosts({
    posts: markdownRaw,
    onlyNewsletter,
    onlyPost,
    onlyHidden
  })

  let notionPosts = []
  const id = BLOG.notionPageId

  if (!id) {
    console.warn('NOTION_PAGE_ID is not set — serving Markdown posts only')
  } else {
    const authToken = BLOG.notionAccessToken || null
    const api = new NotionAPI({ authToken })

    try {
      const response = await api.getPage(id)

      const uuid = idToUuid(id)
      const block = response.block
      const collectionQuery = response.collection_query

      const rawMetadata = normalizeNotionMetadata(block, uuid)

      const collectionId = rawMetadata?.collection_id
      const rawCollection =
        response.collection?.[collectionId] ||
        response.collection?.[idToUuid(collectionId)] ||
        Object.values(response.collection)[0] ||
        {}
      const collection = normalizeCollection(rawCollection)
      const schema = normalizeSchema(collection?.schema || {})

      if (
        rawMetadata?.type !== 'collection_view_page' &&
        rawMetadata?.type !== 'collection_view'
      ) {
        console.log(`pageId '${uuid}' is not a database`)
      } else {
        const pageIds = getAllPageIds(collectionQuery)
        const data = []
        for (let i = 0; i < pageIds.length; i++) {
          const pid = pageIds[i]
          const pageBlock = normalizePageBlock(block[pid])

          if (!pageBlock) {
            console.warn(`Could not resolve page block for id: ${pid}`)
            continue
          }

          const properties = (await getPageProperties(pid, pageBlock, schema)) || null
          if (!properties) continue

          properties.fullWidth = pageBlock?.format?.page_full_width ?? false
          properties.date = (
            properties.date?.start_date
              ? dayjs.tz(properties.date?.start_date)
              : dayjs(pageBlock?.created_time)
          ).valueOf()

          data.push(properties)
        }

        notionPosts = filterPublishedPosts({
          posts: data.map((p) => ({ ...p, source: 'notion' })),
          onlyNewsletter,
          onlyPost,
          onlyHidden
        })
      }
    } catch (error) {
      console.error('Failed to get posts from Notion:', error.message)
      if (error.response?.statusCode === 400) {
        console.error('Check: NOTION_PAGE_ID, NOTION_ACCESS_TOKEN, page type')
      }
    }
  }

  const posts = [...notionPosts, ...markdownPosts]

  if (BLOG.sortByDate) {
    posts.sort((a, b) => b.date - a.date)
  }

  return posts
}
