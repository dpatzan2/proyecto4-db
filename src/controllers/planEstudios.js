import * as peService from '../services/planEstudios.js';

export async function listarPlanEstudios(req, res, next) {
  try {
    const list = await peService.listarPlanDeCarrera(req.params.carId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearPlanEstudio(req, res, next) {
  try {
    const nuevo = await peService.crearPlanEstudio(req.params.carId, req.body);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
}

export async function obtenerPlanEstudio(req, res, next) {
  try {
    const pe = await peService.obtenerPlanEstudio(req.params.peId);
    res.json(pe);
  } catch (err) { next(err); }
}

export async function actualizarPlanEstudio(req, res, next) {
  try {
    const upd = await peService.actualizarPlanEstudio(req.params.peId, req.body);
    res.json(upd);
  } catch (err) { next(err); }
}

export async function borrarPlanEstudio(req, res, next) {
  try {
    await peService.borrarPlanEstudio(req.params.peId);
    res.status(204).end();
  } catch (err) { next(err); }
}
