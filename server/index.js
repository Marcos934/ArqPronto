import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import projetosRoutes from './routes/projetos.js';
import pool from './config/database.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Test database connection with retry mechanism
const testDatabaseConnection = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log('✅ Database connection established successfully');
      connection.release();
      return true;
    } catch (error) {
      console.error(`❌ Database connection attempt ${i + 1} failed:`, error.message);
      if (i < retries - 1) {
        console.log('Retrying connection in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
  return false;
};

// Initialize server
const initializeServer = async () => {
  // Test database connection
  const isConnected = await testDatabaseConnection();
  if (!isConnected) {
    console.error('Failed to establish database connection after multiple attempts');
    // Continue server startup despite database connection failure
  }

  // Middleware
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.json());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/projetos', projetosRoutes);

  // Health check
  app.get('/api/health', async (req, res) => {
    try {
      const connection = await pool.getConnection();
      connection.release();
      res.json({ 
        status: 'ok', 
        database: 'connected',
        timestamp: new Date().toISOString() 
      });
    } catch (error) {
      res.json({ 
        status: 'ok', 
        database: 'disconnected',
        timestamp: new Date().toISOString() 
      });
    }
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
  });

  // Start server
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
};

initializeServer().catch(error => {
  console.error('Failed to initialize server:', error);
  process.exit(1);
});