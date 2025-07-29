import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Database connection pool
const pool = mysql.createPool({
  host: '162.241.203.85',
  port: '3306',
  user: 'devloo72_admin',
  password: '#FernandoGDZ2024ç',
  database: 'devloo72_terraraprojetos',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  let connection;
  try {
    const { email, senha } = req.body;
    console.log('Login attempt:', { email });

    connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT * FROM usuarios_admin WHERE email = ? AND status = "ativo"',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'terraraprojetos2024secret',
      { expiresIn: '24h' }
    );

    console.log('Successful login for:', email);

    res.json({
      token,
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  } finally {
    if (connection) connection.release();
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const connection = await pool.getConnection();
    console.log('✅ Database connection established successfully');
    connection.release();

    // Start server
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();