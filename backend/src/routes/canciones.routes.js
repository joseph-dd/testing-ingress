// src/routes/canciones.routes.js

import { Router } from 'express';
import {
  getAllCanciones,
  getCancionById,
  createCancion,
  updateCancion,
  deleteCancion 
} from '../controllers/canciones.controller.js';

const router = Router();

// ... (rutas GET, POST, y PUT existentes) ...
router.get('/', getAllCanciones);
router.get('/:id', getCancionById);
router.post('/', createCancion);
router.put('/:id', updateCancion);

// DELETE /api/canciones/:id  <-- Nueva Ruta
router.delete('/:id', deleteCancion);

export default router;