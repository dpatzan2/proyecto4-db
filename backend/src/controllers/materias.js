import * as matService from '../services/materias.js';

export async function listarMaterias(req, res, next) {
  try {
    const list = await matService.listarMateriasDeDepartamento(req.params.depId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearMateria(req, res, next) {
  try {
    const nueva = await matService.crearMateria(req.params.depId, req.body);
    res.status(201).json(nueva);
  } catch (err) { next(err); }
}

export async function obtenerMateria(req, res, next) {
  try {
    const mat = await matService.obtenerMateria(req.params.matId);
    res.json(mat);
  } catch (err) { next(err); }
}

export async function actualizarMateria(req, res, next) {
  try {
    const updated = await matService.actualizarMateria(req.params.matId, req.body);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function borrarMateria(req, res, next) {
  try {
    await matService.borrarMateria(req.params.matId);
    res.status(204).end();
  } catch (err) { next(err); }
}
