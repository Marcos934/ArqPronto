import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projetosRoutes from './routes/projetos.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/projetos', projetosRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});