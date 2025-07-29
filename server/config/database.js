import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: '162.241.203.85',
  port: '3306',
  user: 'devloo72_admin',
  password: '#FernandoGDZ2024ç',
  database: 'devloo72_terraraprojetos',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds timeout
  ssl: {
    rejectUnauthorized: false
  }
});

// Verify connection configuration
console.log('Database configuration:', {
  host: '162.241.203.85',
  user: 'devloo72_admin',
  database: 'devloo72_terraraprojetos',
  port: '3306'
});

export default pool;