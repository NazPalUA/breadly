import { defineConfig } from 'drizzle-kit'
import { env } from './env'

export default defineConfig({
  out: './server/db/migrations',
  schema: './server/db/schema',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL },
  casing: 'snake_case'
})
