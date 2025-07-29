import pool from './config/database.js';

async function testConnection() {
  let connection;
  try {
    console.log('Attempting to connect to database...');
    connection = await pool.getConnection();
    console.log('✅ Database connection established successfully');
    
    const [result] = await connection.query('SELECT 1');
    console.log('✅ Test query executed successfully:', result);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error connecting to database:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
}

testConnection();