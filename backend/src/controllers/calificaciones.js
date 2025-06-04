import * as calService from '../services/calificaciones.js';

export async function listarCalificaciones(req, res, next) {
  try {
    const list = await calService.listarCalificacionesDeInscripcion(req.params.insId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearCalificacion(req, res, next) {
  try {
    const nueva = await calService.crearCalificacion(req.params.insId, req.body);
    res.status(201).json(nueva);
  } catch (err) { next(err); }
}

export async function obtenerCalificacion(req, res, next) {
  try {
    const cal = await calService.obtenerCalificacion(req.params.calId);
    res.json(cal);
  } catch (err) { next(err); }
}

export async function actualizarCalificacion(req, res, next) {
  try {
    const upd = await calService.actualizarCalificacion(req.params.calId, req.body);
    res.json(upd);
  } catch (err) { next(err); }
}

export async function borrarCalificacion(req, res, next) {
  try {
    await calService.borrarCalificacion(req.params.calId);
    res.status(204).end();
  } catch (err) { next(err); }
}
