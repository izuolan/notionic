import { NextComment } from '@fuma-comment/server/next'
import { auth, storage } from '@/lib/comment-config'

const handler = NextComment({ auth, storage })

async function router(req, context) {
  const params = await context.params
  const comment = params.comment ?? []
  const patchedContext = { ...context, params: Promise.resolve({ comment }) }
  const method = req.method.toUpperCase()
  if (method === 'GET') return handler.GET(req, patchedContext)
  if (method === 'POST') return handler.POST(req, patchedContext)
  if (method === 'PATCH') return handler.PATCH(req, patchedContext)
  if (method === 'DELETE') return handler.DELETE(req, patchedContext)
  return new Response('Method Not Allowed', { status: 405 })
}

export const GET = router
export const POST = router
export const PATCH = router
export const DELETE = router
