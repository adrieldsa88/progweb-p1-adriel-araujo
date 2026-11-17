
import { Router } from 'express';
import { motoController } from '../controllers/motoController.js';

const router = Router();

router.get('/', motoController.listar);
router.get('/:id', motoController.buscarPorId);
router.post('/', motoController.criar);
router.put('/:id', motoController.atualizar);
router.delete('/:id', motoController.remover);

export default router;
