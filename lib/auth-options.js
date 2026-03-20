import GitHubProvider from 'next-auth/providers/github'
import { db } from './db.js'
import { fumaUsers } from './comment-schema.js'

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET || !process.env.NEXTAUTH_SECRET) {
  console.warn(
    '[fuma-comment] Missing required environment variables: GITHUB_ID, GITHUB_SECRET, NEXTAUTH_SECRET. ' +
    'GitHub OAuth sign-in will not work until these are configured.'
  )
}

if (!process.env.NEXTAUTH_URL) {
  if (process.env.REPLIT_DEV_DOMAIN) {
    process.env.NEXTAUTH_URL = `https://${process.env.REPLIT_DEV_DOMAIN}`
  } else if (process.env.REPLIT_DOMAINS) {
    process.env.NEXTAUTH_URL = `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`
  }
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  events: {
    async signIn({ user, account }) {
      const userId = account?.providerAccountId ?? user.id
      if (!userId) return
      try {
        await db
          .insert(fumaUsers)
          .values({
            id: userId,
            name: user.name ?? null,
            image: user.image ?? null,
          })
          .onConflictDoUpdate({
            target: fumaUsers.id,
            set: {
              name: user.name ?? null,
              image: user.image ?? null,
            },
          })
      } catch (e) {
        console.error('Failed to upsert fuma user:', e)
      }
    },
  },
}
