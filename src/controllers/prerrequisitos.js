import * as prService from '../services/prerrequisitos.js';

export async function listarPrerrequisitos(req, res, next) {
  try {
    const list = await prService.listarPrerrequisitosDeMateria(req.params.matId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearPrerrequisito(req, res, next) {
  try {
    const nuevo = await prService.crearPrerrequisito(req.params.matId, req.body);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
}

export async function borrarPrerrequisito(req, res, next) {
  try {
    await prService.borrarPrerrequisito(req.params.prId);
    res.status(204).end();
  } catch (err) { next(err); }
}
