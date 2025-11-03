import { Router } from 'express';
import {
  getAllVotos,
  createVoto,
  getVotoById,
  deleteVoto,
  updateVoto, // <-- Importar
  getTopCanciones, // <-- Importar
} from '../controllers/votos.controller.js';

const router = Router();

router.get('/', getAllVotos);
router.get('/top', getTopCanciones);
router.get('/:id', getVotoById);
router.post('/', createVoto);
router.put('/:id', updateVoto);
router.delete('/:id', deleteVoto);

export default router;
