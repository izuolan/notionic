import { createDrizzleAdapter } from '@fuma-comment/server/adapters/drizzle'
import { createNextAuthAdapter } from '@fuma-comment/server/adapters/next-auth'
import { authOptions } from './auth-options.js'
import { db } from './db.js'
import { comments, rates, roles, fumaUsers } from './comment-schema.js'

export const auth = createNextAuthAdapter(authOptions)

export const storage = createDrizzleAdapter({
  db,
  schemas: {
    comments,
    rates,
    roles,
    user: fumaUsers,
  },
  auth,
})
