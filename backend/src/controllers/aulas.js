import * as aulaService from '../services/aulas.js';

export async function listarAulas(req, res, next) {
  try {
    const list = await aulaService.listarAulasDeFacultad(req.params.facId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearAula(req, res, next) {
  try {
    const nueva = await aulaService.crearAula(req.params.facId, req.body);
    res.status(201).json(nueva);
  } catch (err) { next(err); }
}

export async function obtenerAula(req, res, next) {
  try {
    const aula = await aulaService.obtenerAula(req.params.aulId);
    res.json(aula);
  } catch (err) { next(err); }
}

export async function actualizarAula(req, res, next) {
  try {
    const upd = await aulaService.actualizarAula(req.params.aulId, req.body);
    res.json(upd);
  } catch (err) { next(err); }
}

export async function borrarAula(req, res, next) {
  try {
    await aulaService.borrarAula(req.params.aulId);
    res.status(204).end();
  } catch (err) { next(err); }
}
