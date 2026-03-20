import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './comment-schema.js'

const sql = postgres(process.env.DATABASE_URL)
export const db = drizzle(sql, { schema })

let initialized = false
export async function ensureDbTables() {
  if (initialized) return
  initialized = true
  await sql`
    CREATE TABLE IF NOT EXISTS fuma_users (
      id VARCHAR(256) PRIMARY KEY,
      name VARCHAR(256),
      image TEXT
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS roles (
      "userId" VARCHAR(256) PRIMARY KEY,
      name VARCHAR(256) NOT NULL,
      "canDelete" BOOLEAN NOT NULL
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      page VARCHAR(256) NOT NULL,
      thread INTEGER,
      author VARCHAR(256) NOT NULL,
      content JSON NOT NULL,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS rates (
      "userId" VARCHAR(256) NOT NULL,
      "commentId" INTEGER NOT NULL,
      "like" BOOLEAN NOT NULL,
      PRIMARY KEY ("userId", "commentId")
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS comment_idx ON rates ("commentId")
  `
}
