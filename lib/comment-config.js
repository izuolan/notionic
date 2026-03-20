import { createDrizzleAdapter } from '@fuma-comment/server/adapters/drizzle'
import { createNextAuthAdapter } from '@fuma-comment/server/adapters/next-auth'
import { inArray, like } from 'drizzle-orm'
import { authOptions } from './auth-options.js'
import { db, ensureDbTables } from './db.js'
import { comments, rates, roles, fumaUsers } from './comment-schema.js'

await ensureDbTables()

const nextAuthAdapter = createNextAuthAdapter(authOptions)

export const auth = {
  ...nextAuthAdapter,
  getUsers: async (userIds) => {
    if (!userIds.length) return []
    const res = await db
      .select({ id: fumaUsers.id, name: fumaUsers.name, image: fumaUsers.image })
      .from(fumaUsers)
      .where(inArray(fumaUsers.id, userIds))
    return res.map((u) => ({
      id: u.id,
      name: u.name ?? 'Unknown User',
      image: u.image ?? undefined,
    }))
  },
  queryUsers: async ({ name, limit }) => {
    const res = await db
      .select({ id: fumaUsers.id, name: fumaUsers.name, image: fumaUsers.image })
      .from(fumaUsers)
      .where(like(fumaUsers.name, `%${name}%`))
      .limit(limit)
    return res.map((u) => ({
      id: u.id,
      name: u.name ?? 'Unknown User',
      image: u.image ?? undefined,
    }))
  },
}

export const storage = createDrizzleAdapter({
  db,
  schemas: { comments, rates, roles },
  auth,
})
