import pool from './config/database.js';

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    
    // Testa uma query simples
    const [result] = await connection.query('SELECT 1');
    console.log('✅ Query de teste executada com sucesso:', result);
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error.message);
    process.exit(1);
  }
}

testConnection();