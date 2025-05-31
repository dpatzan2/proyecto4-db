import { Router } from 'express';
import * as aulaCtrl from '../controllers/aulas.js';

const router = Router({ mergeParams: true });

router.get('/', aulaCtrl.listarAulas);
router.post('/', aulaCtrl.crearAula);
router.get('/:aulId', aulaCtrl.obtenerAula);
router.put('/:aulId', aulaCtrl.actualizarAula);
router.delete('/:aulId', aulaCtrl.borrarAula);

export default router;
