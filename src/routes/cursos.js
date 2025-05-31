import { Router } from 'express';
import * as curCtrl from '../controllers/cursos.js';
import inscripcionesRouter from './inscripciones.js';
import horariossRouter from './horarios.js';

const router = Router({ mergeParams: true });

router.get('/', curCtrl.listarCursos);
router.post('/', curCtrl.crearCurso);
router.get('/:cursoId', curCtrl.obtenerCurso);
router.put('/:cursoId', curCtrl.actualizarCurso);
router.delete('/:cursoId', curCtrl.borrarCurso);

router.use('/:cursoId/inscripciones', inscripcionesRouter);
router.use('/:cursoId/horarios', horariossRouter);

export default router;
