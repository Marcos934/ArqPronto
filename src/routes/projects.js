import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../config/database.js';

const router = Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const [projects] = await db.query('SELECT * FROM projects');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const [project] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (project.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create new project
router.post('/', [
  body('title').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('type').isIn(['residential', 'commercial']),
  body('area').isNumeric(),
  body('price').isNumeric(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, type, area, price, images, details } = req.body;
    const [result] = await db.query(
      'INSERT INTO projects (title, description, type, area, price, images, details) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, type, area, price, JSON.stringify(images), JSON.stringify(details)]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', [
  body('title').optional().trim(),
  body('description').optional().trim(),
  body('type').optional().isIn(['residential', 'commercial']),
  body('area').optional().isNumeric(),
  body('price').optional().isNumeric(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updates = req.body;
    if (updates.images) updates.images = JSON.stringify(updates.images);
    if (updates.details) updates.details = JSON.stringify(updates.details);

    const [result] = await db.query(
      'UPDATE projects SET ? WHERE id = ?',
      [updates, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export const projectRoutes = router;