import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  schema: './src/db/schema.ts',
  driver: 'turso',
  dialect: 'sqlite',
  dbCredentials: {
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    out: './migrations',
});

export default config