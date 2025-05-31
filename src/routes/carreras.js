import { Router } from 'express';
import * as carCtrl from '../controllers/carreras.js';
import estudiantesRouter from './estudiantes.js';
import planEstudiosRouter from './planEstudios.js';

const router = Router({ mergeParams: true });

router.get('/', carCtrl.listarCarreras);
router.post('/', carCtrl.crearCarrera);
router.get('/:carId', carCtrl.obtenerCarrera);
router.put('/:carId', carCtrl.actualizarCarrera);
router.delete('/:carId', carCtrl.borrarCarrera);

router.use('/:carId/estudiantes', estudiantesRouter);
router.use('/:carId/plan_estudios', planEstudiosRouter);

export default router;
