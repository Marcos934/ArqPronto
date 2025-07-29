import pool from '../config/database.js';

export const listarProjetos = async (req, res) => {
  try {
    const [projetos] = await pool.query(`
      SELECT * FROM projetos 
      WHERE status = 'ativo' 
      ORDER BY created_at DESC
    `);

    // Parse JSON fields
    const projetosFormatados = projetos.map(projeto => ({
      ...projeto,
      imagens: JSON.parse(projeto.imagens),
      detalhes: JSON.parse(projeto.detalhes),
      especificacoes_tecnicas: JSON.parse(projeto.especificacoes_tecnicas),
      areas_internas: JSON.parse(projeto.areas_internas),
      inclusos: JSON.parse(projeto.inclusos)
    }));

    res.json(projetosFormatados);
  } catch (error) {
    console.error('Erro ao listar projetos:', error);
    res.status(500).json({ error: error.message });
  }
};

export const criarProjeto = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      titulo,
      descricao,
      tipo,
      preco,
      area,
      imagens,
      detalhes,
      especificacoes_tecnicas,
      areas_internas,
      inclusos,
      promocao_ativa,
      preco_promocional,
      promocao_inicio,
      promocao_fim
    } = req.body;

    const [result] = await connection.query(
      `INSERT INTO projetos (
        titulo, descricao, tipo, preco, area, imagens,
        detalhes, especificacoes_tecnicas, areas_internas,
        inclusos, status, promocao_ativa, preco_promocional,
        promocao_inicio, promocao_fim, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ativo', ?, ?, ?, ?, NOW(), NOW())`,
      [
        titulo,
        descricao,
        tipo,
        preco,
        area,
        JSON.stringify(Array.isArray(imagens) ? imagens : imagens.split('\n').filter(url => url.trim())),
        JSON.stringify(detalhes),
        JSON.stringify(especificacoes_tecnicas),
        JSON.stringify(areas_internas),
        JSON.stringify(Array.isArray(inclusos) ? inclusos : inclusos.split('\n').filter(item => item.trim())),
        promocao_ativa || false,
        preco_promocional,
        promocao_inicio,
        promocao_fim
      ]
    );

    await connection.commit();
    res.status(201).json({
      message: 'Projeto criado com sucesso',
      id: result.insertId
    });
  } catch (error) {
    await connection.rollback();
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

export const atualizarProjeto = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      titulo,
      descricao,
      tipo,
      preco,
      area,
      imagens,
      detalhes,
      especificacoes_tecnicas,
      areas_internas,
      inclusos,
      promocao_ativa,
      preco_promocional,
      promocao_inicio,
      promocao_fim
    } = req.body;

    await connection.query(
      `UPDATE projetos SET
        titulo = ?,
        descricao = ?,
        tipo = ?,
        preco = ?,
        area = ?,
        imagens = ?,
        detalhes = ?,
        especificacoes_tecnicas = ?,
        areas_internas = ?,
        inclusos = ?,
        promocao_ativa = ?,
        preco_promocional = ?,
        promocao_inicio = ?,
        promocao_fim = ?,
        updated_at = NOW()
      WHERE id = ?`,
      [
        titulo,
        descricao,
        tipo,
        preco,
        area,
        JSON.stringify(Array.isArray(imagens) ? imagens : imagens.split('\n').filter(url => url.trim())),
        JSON.stringify(detalhes),
        JSON.stringify(especificacoes_tecnicas),
        JSON.stringify(areas_internas),
        JSON.stringify(Array.isArray(inclusos) ? inclusos : inclusos.split('\n').filter(item => item.trim())),
        promocao_ativa || false,
        preco_promocional,
        promocao_inicio,
        promocao_fim,
        req.params.id
      ]
    );

    await connection.commit();
    res.json({ message: 'Projeto atualizado com sucesso' });
  } catch (error) {
    await connection.rollback();
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};