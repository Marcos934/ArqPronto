import express from 'express';
import { 
  listarProjetos, 
  buscarProjeto, 
  criarProjeto, 
  atualizarProjeto, 
  deletarProjeto 
} from '../controllers/projetosController.js';

const router = express.Router();

// Public routes
router.get('/', listarProjetos);
router.get('/:id', buscarProjeto);
router.post('/', criarProjeto);
router.put('/:id', atualizarProjeto);
router.delete('/:id', deletarProjeto);

export default router;