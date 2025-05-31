import * as curService from '../services/cursos.js';

export async function listarCursos(req, res, next) {
  try {
    const list = await curService.listarCursosDeMateria(req.params.matId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearCurso(req, res, next) {
  try {
    const nuevo = await curService.crearCursoDeMateria(req.params.matId, req.body);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
}

export async function obtenerCurso(req, res, next) {
  try {
    const curso = await curService.obtenerCurso(req.params.cursoId);
    res.json(curso);
  } catch (err) { next(err); }
}

export async function actualizarCurso(req, res, next) {
  try {
    const upd = await curService.actualizarCurso(req.params.cursoId, req.body);
    res.json(upd);
  } catch (err) { next(err); }
}

export async function borrarCurso(req, res, next) {
  try {
    await curService.borrarCurso(req.params.cursoId);
    res.status(204).end();
  } catch (err) { next(err); }
}
