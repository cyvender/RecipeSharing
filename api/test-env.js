// api/test-db.js
require('dotenv').config();
const { Pool } = require('pg');

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to Supabase database!');
    const res = await client.query('SELECT NOW()');
    console.log('Current time from DB:', res.rows[0]);
    client.release();
  } catch (err) {
    console.error('Connection failed:', err.stack);
  }
}

testConnection();
 