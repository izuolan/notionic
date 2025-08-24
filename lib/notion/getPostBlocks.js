import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client'
import { getPreviewImageMap } from './previewImages'

export async function getPostBlocks(id) {
  const authToken = BLOG.notionAccessToken || null
  const api = new NotionAPI({ authToken })
  
  try {
    const pageBlock = await api.getPage(id)
    if (BLOG.previewImagesEnabled) {
      const previewImageMap = await getPreviewImageMap(pageBlock)
      pageBlock.preview_images = previewImageMap
    }
    return pageBlock
  } catch (error) {
    console.error(`Failed to get page blocks for ${id}:`, error.message)
    if (error.response?.statusCode === 400) {
      console.error('This might be due to missing environment variables or incorrect Notion page ID')
    }
    throw error
  }
}
