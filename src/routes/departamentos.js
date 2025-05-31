import { Router } from 'express';
import * as depCtrl from '../controllers/departamentos.js';
import carrerasRouter from './carreras.js';
import profesoresRouter from './profesores.js';
import materiasRouter from './materias.js';

const router = Router({ mergeParams: true });

router.get('/', depCtrl.listarDepartamentos);
router.post('/', depCtrl.crearDepartamento);
router.get('/:depId', depCtrl.obtenerDepartamento);
router.put('/:depId', depCtrl.actualizarDepartamento);
router.delete('/:depId', depCtrl.borrarDepartamento);

router.use('/:depId/carreras', carrerasRouter);
router.use('/:depId/profesores', profesoresRouter);
router.use('/:depId/materias', materiasRouter);

export default router;
