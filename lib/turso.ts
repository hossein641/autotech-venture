import { createClient } from '@libsql/client';
import { config } from 'dotenv';

// Load environment variables
config();

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const client = createClient({
  url: process.env.DATABASE_URL,
});

export { client as turso };

// Test connection function
export async function testTursoConnection() {
  try {
    const result = await client.execute('SELECT 1 as test');
    console.log('✅ Turso connection successful:', result);
    return true;
  } catch (error) {
    console.error('❌ Turso connection failed:', error);
    return false;
  }
}