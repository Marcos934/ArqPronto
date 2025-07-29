import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log('Tentativa de login:', { email });

    const [usuarios] = await pool.query(
      'SELECT * FROM usuarios_admin WHERE email = ? AND status = "ativo"',
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const usuario = usuarios[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET || 'terraraprojetos2024secret',
      { expiresIn: '24h' }
    );

    console.log('Login bem-sucedido para:', usuario.email);

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: error.message });
  }
};