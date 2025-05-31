import * as estService from '../services/estudiantes.js';

export async function listarEstudiantes(req, res, next) {
  try {
    const list = await estService.listarEstudiantesDeCarrera(req.params.carId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearEstudiante(req, res, next) {
  try {
    const nuevo = await estService.crearEstudiante(req.params.carId, req.body);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
}

export async function obtenerEstudiante(req, res, next) {
  try {
    const est = await estService.obtenerEstudiante(req.params.estId);
    res.json(est);
  } catch (err) { next(err); }
}

export async function actualizarEstudiante(req, res, next) {
  try {
    const upd = await estService.actualizarEstudiante(req.params.estId, req.body);
    res.json(upd);
  } catch (err) { next(err); }
}

export async function borrarEstudiante(req, res, next) {
  try {
    await estService.borrarEstudiante(req.params.estId);
    res.status(204).end();
  } catch (err) { next(err); }
}
