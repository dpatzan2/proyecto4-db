import { Router } from 'express';
import * as calCtrl from '../controllers/calificaciones.js';

const router = Router({ mergeParams: true });

router.get('/', calCtrl.listarCalificaciones);
router.post('/', calCtrl.crearCalificacion);
router.get('/:calId', calCtrl.obtenerCalificacion);
router.put('/:calId', calCtrl.actualizarCalificacion);
router.delete('/:calId', calCtrl.borrarCalificacion);

export default router;
