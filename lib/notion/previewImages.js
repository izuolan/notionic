import BLOG from '@/blog.config'
import lqip from '../lqip.js'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

import { defaultMapImageUrl, getPageImageUrls } from 'notion-utils'

export async function getPreviewImageMap(recordMap) {
  const urls = getPageImageUrls(recordMap, {
    mapImageUrl: defaultMapImageUrl
  }).filter((url) => url && !url.includes('.svg') && !url.includes(`${BLOG.ogImageGenerateHost}`))

  const previewImagesMap = Object.fromEntries(
    await pMap(urls, async (url) => [url, await getPreviewImage(url)], {
      concurrency: 8
    })
  )

  return previewImagesMap
}

async function createPreviewImage(url) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    let response
    try {
      response = await fetch(url, { signal: controller.signal })
    } finally {
      clearTimeout(timeout)
    }
    if (!response.ok) {
      console.warn(`HTTP ${response.status} when fetching image: ${url}`)
      return null
    }
    const body = Buffer.from(await response.arrayBuffer())
    const result = await lqip(body)

    return {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.warn(`Timeout fetching image: ${url}`)
      return null
    }
    if (err.message === 'Input buffer contains unsupported image format') {
      console.warn(`Unsupported image format: ${url}`)
      return null
    }
    console.warn(`Failed to create preview image for ${url}:`, err.message)
    return null
  }
}

export const getPreviewImage = pMemoize(createPreviewImage)
