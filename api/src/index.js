import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projetosRoutes from './routes/projetos.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configuração do CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para processar JSON
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'TerraraProjetos API',
    version: '1.0.0',
    status: 'online'
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/projetos', projetosRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});