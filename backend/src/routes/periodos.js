import { Router } from 'express';
import * as paCtrl from '../controllers/periodos.js';

const router = Router({ mergeParams: true });

router.get('/', paCtrl.listarPeriodos);
router.post('/', paCtrl.crearPeriodo);
router.get('/:paId', paCtrl.obtenerPeriodo);
router.put('/:paId', paCtrl.actualizarPeriodo);
router.delete('/:paId', paCtrl.borrarPeriodo);

export default router;
