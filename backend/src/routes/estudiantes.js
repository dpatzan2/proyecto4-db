import { Router } from 'express';
import * as estCtrl from '../controllers/estudiantes.js';

const router = Router({ mergeParams: true });

router.get('/', estCtrl.listarEstudiantes);
router.post('/', estCtrl.crearEstudiante);
router.get('/:estId', estCtrl.obtenerEstudiante);
router.put('/:estId', estCtrl.actualizarEstudiante);
router.delete('/:estId', estCtrl.borrarEstudiante);

export default router;
