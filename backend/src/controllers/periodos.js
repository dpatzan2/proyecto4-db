import * as paService from '../services/periodos.js';

export async function listarPeriodos(req, res, next) {
  try {
    const list = await paService.listarPeriodosDeUniversidad(req.params.uniId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearPeriodo(req, res, next) {
  try {
    const nuevo = await paService.crearPeriodo(req.params.uniId, req.body);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
}

export async function obtenerPeriodo(req, res, next) {
  try {
    const per = await paService.obtenerPeriodo(req.params.paId);
    res.json(per);
  } catch (err) { next(err); }
}

export async function actualizarPeriodo(req, res, next) {
  try {
    const upd = await paService.actualizarPeriodo(req.params.paId, req.body);
    res.json(upd);
  } catch (err) { next(err); }
}

export async function borrarPeriodo(req, res, next) {
  try {
    await paService.borrarPeriodo(req.params.paId);
    res.status(204).end();
  } catch (err) { next(err); }
}
