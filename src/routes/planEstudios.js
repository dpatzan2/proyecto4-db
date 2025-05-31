import { Router } from 'express';
import * as peCtrl from '../controllers/planEstudios.js';

const router = Router({ mergeParams: true });

router.get('/', peCtrl.listarPlanEstudios);
router.post('/', peCtrl.crearPlanEstudio);
router.get('/:peId', peCtrl.obtenerPlanEstudio);
router.put('/:peId', peCtrl.actualizarPlanEstudio);
router.delete('/:peId', peCtrl.borrarPlanEstudio);

export default router;
