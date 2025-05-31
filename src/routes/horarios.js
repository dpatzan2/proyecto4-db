import { Router } from 'express';
import * as horCtrl from '../controllers/horarios.js';

const router = Router({ mergeParams: true });

router.get('/', horCtrl.listarHorarios);
router.post('/', horCtrl.crearHorario);
router.get('/:horId', horCtrl.obtenerHorario);
router.put('/:horId', horCtrl.actualizarHorario);
router.delete('/:horId', horCtrl.borrarHorario);

export default router;
