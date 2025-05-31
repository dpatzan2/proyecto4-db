import { Router } from 'express';
import * as prCtrl from '../controllers/prerrequisitos.js';

const router = Router({ mergeParams: true });

router.get('/', prCtrl.listarPrerrequisitos);
router.post('/', prCtrl.crearPrerrequisito);
router.delete('/:prId', prCtrl.borrarPrerrequisito);

export default router;
