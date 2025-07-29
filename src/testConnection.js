import mysql from 'mysql2/promise';

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

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connection established successfully');
    
    // Test a simple query
    const [result] = await connection.query('SELECT 1');
    console.log('✅ Test query executed successfully:', result);
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error connecting to database:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testConnection();