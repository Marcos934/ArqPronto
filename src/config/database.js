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
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection immediately
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connection established successfully');
    
    // Test a simple query
    const [result] = await connection.query('SELECT 1');
    console.log('✅ Test query executed successfully');
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error connecting to database:', error.message);
    return false;
  }
};

// Execute test immediately
testConnection();

export default pool;