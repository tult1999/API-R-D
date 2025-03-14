const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // Replace with your PostgreSQL username
  host: 'postgres',       // Replace with your PostgreSQL host (e.g., localhost)
  database: 'fnb', // Replace with your PostgreSQL database name
  password: 'postgres', // Replace with your PostgreSQL password
  port: 5432,               // Default PostgreSQL port
});

module.exports = {
  pool,
};