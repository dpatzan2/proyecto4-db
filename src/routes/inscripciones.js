import { Router } from 'express';
import * as insCtrl from '../controllers/inscripciones.js';
import calificacionesRouter from './calificaciones.js';

const router = Router({ mergeParams: true });

router.get('/', insCtrl.listarInscripciones);
router.post('/', insCtrl.crearInscripcion);
router.get('/:insId', insCtrl.obtenerInscripcion);
router.put('/:insId', insCtrl.actualizarInscripcion);
router.delete('/:insId', insCtrl.borrarInscripcion);

router.use('/:insId/calificaciones', calificacionesRouter);

export default router;
