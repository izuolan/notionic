import GitHubProvider from 'next-auth/providers/github'
import { db } from './db.js'
import { fumaUsers } from './comment-schema.js'

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
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
  events: {
    async signIn({ user }) {
      if (!user?.email) return
      try {
        await db
          .insert(fumaUsers)
          .values({
            id: user.email,
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
