// lib/db.ts
import { Client } from 'pg';

let client: Client;

if (!globalThis.__pgClient) {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  client.connect();
  // @ts-ignore
  globalThis.__pgClient = client;
} else {
  // @ts-ignore
  client = globalThis.__pgClient;
}

export default client;
