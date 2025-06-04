import * as facService from '../services/facultades.js';

export async function listarFacultades(req, res, next) {
  try {
    const list = await facService.listarFacultadesDeUniversidad(req.params.uniId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearFacultad(req, res, next) {
  try {
    const nueva = await facService.crearFacultad(req.params.uniId, req.body);
    res.status(201).json(nueva);
  } catch (err) { next(err); }
}

export async function obtenerFacultad(req, res, next) {
  try {
    const fac = await facService.obtenerFacultad(req.params.facId);
    res.json(fac);
  } catch (err) { next(err); }
}

export async function actualizarFacultad(req, res, next) {
  try {
    const updated = await facService.actualizarFacultad(req.params.facId, req.body);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function borrarFacultad(req, res, next) {
  try {
    await facService.borrarFacultad(req.params.facId);
    res.status(204).end();
  } catch (err) { next(err); }
}
