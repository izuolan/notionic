import { NextComment } from '@fuma-comment/server/next'
import { auth, storage } from '@/lib/comment-config'

const { GET: _GET, POST: _POST, PATCH: _PATCH, DELETE: _DELETE } = NextComment({ auth, storage })

// In Next.js 14, ctx.params is a plain object (not a Promise).
// Fuma Comment calls `(await context.params).comment.join("/")` which requires
// it to be awaitable, and normalizes the optional catch-all (undefined → []).
function normalize(handler) {
  return (req, ctx) =>
    handler(req, { ...ctx, params: Promise.resolve({ comment: ctx.params?.comment ?? [] }) })
}

export const GET = normalize(_GET)
export const POST = normalize(_POST)
export const PATCH = normalize(_PATCH)
export const DELETE = normalize(_DELETE)
