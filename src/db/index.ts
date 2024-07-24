import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema'

const client = createClient({ url: 'libsql://expense-tracker-db-rahulsreekumar81.turso.io',
     authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjE4MTI5NzcsImlkIjoiMDk1YjFmODAtNDdmZi00YWNhLWI1NzQtMDhhMjMxMTU0N2Q3In0.ExNRYu0zg62yayE5KsbZU2UDD8JPIX6KIqeUo5JGyWLQR3ltvPb-rxTsBaT4pRaBQqMGM3RkGa53m9aclvDTCg' });

export const db = drizzle(client,{schema});
