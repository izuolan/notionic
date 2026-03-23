import { NextComment } from '@fuma-comment/server/next'
import { auth, storage } from '@/lib/comment-config'

const { GET: _GET, POST: _POST, PATCH: _PATCH, DELETE: _DELETE } = NextComment({ auth, storage })

async function withParams(handler, req, ctx) {
  const params = await ctx.params
  const normalized = { comment: params?.comment ?? [] }
  return handler(req, { ...ctx, params: Promise.resolve(normalized) })
}

export const GET = (req, ctx) => withParams(_GET, req, ctx)
export const POST = (req, ctx) => withParams(_POST, req, ctx)
export const PATCH = (req, ctx) => withParams(_PATCH, req, ctx)
export const DELETE = (req, ctx) => withParams(_DELETE, req, ctx)
