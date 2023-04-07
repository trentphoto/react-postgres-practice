require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT * FROM users');
    const data = result.rows;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal server error' });
  }
}
