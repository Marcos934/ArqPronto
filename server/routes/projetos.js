import express from 'express';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', (req, res) => {
  res.json({ message: 'Projetos endpoint' });
});

// Protected routes
router.use(auth);

export default router;