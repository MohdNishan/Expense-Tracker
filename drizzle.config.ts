import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  schema: './src/db/schema.ts',
  driver: 'turso',
  dialect: 'sqlite',
  dbCredentials: {
      url: 'libsql://expense-tracker-db-rahulsreekumar81.turso.io',
      authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjE4MTI5NzcsImlkIjoiMDk1YjFmODAtNDdmZi00YWNhLWI1NzQtMDhhMjMxMTU0N2Q3In0.ExNRYu0zg62yayE5KsbZU2UDD8JPIX6KIqeUo5JGyWLQR3ltvPb-rxTsBaT4pRaBQqMGM3RkGa53m9aclvDTCg',
    },
    out: './migrations',
});

export default config