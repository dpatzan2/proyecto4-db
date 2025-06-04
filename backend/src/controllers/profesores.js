import * as profService from '../services/profesores.js';

export async function listarProfesores(req, res, next) {
  try {
    const list = await profService.listarProfesoresDeDepartamento(req.params.depId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearProfesor(req, res, next) {
  try {
    const nuevo = await profService.crearProfesor(req.params.depId, req.body);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
}

export async function obtenerProfesor(req, res, next) {
  try {
    const prof = await profService.obtenerProfesor(req.params.profId);
    res.json(prof);
  } catch (err) { next(err); }
}

export async function actualizarProfesor(req, res, next) {
  try {
    const upd = await profService.actualizarProfesor(req.params.profId, req.body);
    res.json(upd);
  } catch (err) { next(err); }
}

export async function borrarProfesor(req, res, next) {
  try {
    await profService.borrarProfesor(req.params.profId);
    res.status(204).end();
  } catch (err) { next(err); }
}
