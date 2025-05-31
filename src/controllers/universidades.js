import * as uniService from '../services/universidades.js';

export async function listarUniversidades(req, res, next) {
  try {
    const list = await uniService.listarUniversidades();
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearUniversidad(req, res, next) {
  try {
    const nueva = await uniService.crearUniversidad(req.body);
    res.status(201).json(nueva);
  } catch (err) { next(err); }
}

export async function obtenerUniversidad(req, res, next) {
  try {
    const uni = await uniService.obtenerUniversidad(req.params.uniId);
    res.json(uni);
  } catch (err) { next(err); }
}

export async function actualizarUniversidad(req, res, next) {
  try {
    const updated = await uniService.actualizarUniversidad(req.params.uniId, req.body);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function borrarUniversidad(req, res, next) {
  try {
    await uniService.borrarUniversidad(req.params.uniId);
    res.status(204).end();
  } catch (err) { next(err); }
}