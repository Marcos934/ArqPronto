import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export const login = async (req, res) => {
  let connection;
  try {
    const { email, senha } = req.body;
    console.log('Login attempt:', { email });

    connection = await pool.getConnection();
    const [usuarios] = await connection.query(
      'SELECT * FROM usuarios_admin WHERE email = ? AND status = "ativo"',
      [email]
    );

    if (usuarios.length === 0) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const usuario = usuarios[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET || 'terraraprojetos2024secret',
      { expiresIn: '24h' }
    );

    console.log('Successful login for:', email);

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  } finally {
    if (connection) connection.release();
  }
};