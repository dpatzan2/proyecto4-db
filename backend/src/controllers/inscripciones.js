import * as insService from '../services/inscripciones.js';

export async function listarInscripciones(req, res, next) {
  try {
    const list = await insService.listarInscripcionesDeCurso(req.params.cursoId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearInscripcion(req, res, next) {
  try {
    const nueva = await insService.crearInscripcion(req.params.cursoId, req.body);
    res.status(201).json(nueva);
  } catch (err) { next(err); }
}

export async function obtenerInscripcion(req, res, next) {
  try {
    const ins = await insService.obtenerInscripcion(req.params.insId);
    res.json(ins);
  } catch (err) { next(err); }
}

export async function actualizarInscripcion(req, res, next) {
  try {
    const upd = await insService.actualizarInscripcion(req.params.insId, req.body);
    res.json(upd);
  } catch (err) { next(err); }
}

export async function borrarInscripcion(req, res, next) {
  try {
    await insService.borrarInscripcion(req.params.insId);
    res.status(204).end();
  } catch (err) { next(err); }
}
