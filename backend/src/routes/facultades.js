import { Router } from 'express';
import * as facCtrl from '../controllers/facultades.js';
import departamentosRouter from './departamentos.js';
import aulasRouter from './aulas.js';

const router = Router({ mergeParams: true });

router.get('/', facCtrl.listarFacultades);
router.post('/', facCtrl.crearFacultad);
router.get('/:facId', facCtrl.obtenerFacultad);
router.put('/:facId', facCtrl.actualizarFacultad);
router.delete('/:facId', facCtrl.borrarFacultad);

router.use('/:facId/departamentos', departamentosRouter);
router.use('/:facId/aulas', aulasRouter);

export default router;
