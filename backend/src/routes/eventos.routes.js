import { Router } from 'express';
import {
  getAllEventos,
  getEventoById, // <-- Importar
  createEvento,
  updateEvento,
  deleteEvento,
} from '../controllers/eventos.controller.js';

const router = Router();

router.get('/', getAllEventos);
router.get('/:id', getEventoById); // <-- Añadir
router.post('/', createEvento);
router.put('/:id', updateEvento);
router.delete('/:id', deleteEvento);

export default router;