import { Router } from 'express';
import * as profCtrl from '../controllers/profesores.js';

const router = Router({ mergeParams: true });

router.get('/', profCtrl.listarProfesores);
router.post('/', profCtrl.crearProfesor);
router.get('/:profId', profCtrl.obtenerProfesor);
router.put('/:profId', profCtrl.actualizarProfesor);
router.delete('/:profId', profCtrl.borrarProfesor);

export default router;
