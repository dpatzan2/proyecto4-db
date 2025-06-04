import { Router } from 'express';
import * as uniCtrl from '../controllers/universidades.js';
import facultadesRouter from './facultades.js';
import periodosRouter from './periodos.js';

const router = Router();

router.get('/', uniCtrl.listarUniversidades);
router.post('/', uniCtrl.crearUniversidad);
router.get('/:uniId', uniCtrl.obtenerUniversidad);
router.put('/:uniId', uniCtrl.actualizarUniversidad);
router.delete('/:uniId', uniCtrl.borrarUniversidad);

router.use('/:uniId/facultades', facultadesRouter);
router.use('/:uniId/periodos', periodosRouter);

export default router;
