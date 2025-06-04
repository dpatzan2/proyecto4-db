import * as horService from '../services/horarios.js';

export async function listarHorarios(req, res, next) {
  try {
    const list = await horService.listarHorariosDeCurso(req.params.cursoId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearHorario(req, res, next) {
  try {
    const nuevo = await horService.crearHorario(req.params.cursoId, req.body);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
}

export async function obtenerHorario(req, res, next) {
  try {
    const hor = await horService.obtenerHorario(req.params.horId);
    res.json(hor);
  } catch (err) { next(err); }
}

export async function actualizarHorario(req, res, next) {
  try {
    const upd = await horService.actualizarHorario(req.params.horId, req.body);
    res.json(upd);
  } catch (err) { next(err); }
}

export async function borrarHorario(req, res, next) {
  try {
    await horService.borrarHorario(req.params.horId);
    res.status(204).end();
  } catch (err) { next(err); }
}
