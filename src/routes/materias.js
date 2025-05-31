import { Router } from 'express';
import * as matCtrl from '../controllers/materias.js';
import prerrequisitosRouter from './prerrequisitos.js';
import cursosRouter from './cursos.js';

const router = Router({ mergeParams: true });

router.get('/', matCtrl.listarMaterias);
router.post('/', matCtrl.crearMateria);
router.get('/:matId', matCtrl.obtenerMateria);
router.put('/:matId', matCtrl.actualizarMateria);
router.delete('/:matId', matCtrl.borrarMateria);

router.use('/:matId/prerrequisitos', prerrequisitosRouter);
router.use('/:matId/cursos', cursosRouter);

export default router;
