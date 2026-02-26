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
  let id = BLOG.notionPageId
  
  // Check if required environment variables are set
  if (!id) {
    console.error('NOTION_PAGE_ID environment variable is required but not set')
    return []
  }
  
  const authToken = BLOG.notionAccessToken || null
  const api = new NotionAPI({ authToken })
  
  try {
    const response = await api.getPage(id)

  id = idToUuid(id)
  const block = response.block
  const collectionQuery = response.collection_query

  const rawMetadata = normalizeNotionMetadata(block, id)

  const collectionId = rawMetadata?.collection_id
  const rawCollection =
    response.collection?.[collectionId] ||
    response.collection?.[idToUuid(collectionId)] ||
    Object.values(response.collection)[0] ||
    {}
  const collection = normalizeCollection(rawCollection)
  const schema = normalizeSchema(collection?.schema || {})

  // Check Type
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.log(`pageId '${id}' is not a database`)
    return null
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const pageBlock = normalizePageBlock(block[id])

      if (!pageBlock) {
        console.warn(`Could not resolve page block for id: ${id}`)
        continue
      }

      const properties = (await getPageProperties(id, pageBlock, schema)) || null
      if (!properties) continue

      // Add fullwidth to properties
      properties.fullWidth = pageBlock?.format?.page_full_width ?? false
      // Convert date (with timezone) to unix milliseconds timestamp
      properties.date = (
        properties.date?.start_date
          ? dayjs.tz(properties.date?.start_date)
          : dayjs(pageBlock?.created_time)
      ).valueOf()

      data.push(properties)
    }

    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({
      posts: data,
      onlyNewsletter,
      onlyPost,
      onlyHidden
    })

    // Sort by date
    if (BLOG.sortByDate) {
      posts.sort((a, b) => b.date - a.date)
    }
    return posts
  }
  } catch (error) {
    console.error(`Failed to get posts from Notion:`, error.message)
    if (error.response?.statusCode === 400) {
      console.error('This might be due to:')
      console.error('- Missing NOTION_PAGE_ID environment variable')
      console.error('- Incorrect Notion page ID')
      console.error('- Missing NOTION_ACCESS_TOKEN for private pages')
      console.error('- Page is not a database/collection')
    }
    return []
  }
}
