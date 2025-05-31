import * as depService from '../services/departamentos.js';

export async function listarDepartamentos(req, res, next) {
  try {
    const list = await depService.listarDepartamentosDeFacultad(req.params.facId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearDepartamento(req, res, next) {
  try {
    const nueva = await depService.crearDepartamento(req.params.facId, req.body );
    res.status(201).json(nueva);
  } catch (err) { next(err); }
}

export async function obtenerDepartamento(req, res, next) {
  try {
    const dep = await depService.obtenerDepartamento(req.params.depId);
    res.json(dep);
  } catch (err) { next(err); }
}

export async function actualizarDepartamento(req, res, next) {
  try {
    const updated = await depService.actualizarDepartamento(req.params.depId, req.body);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function borrarDepartamento(req, res, next) {
  try {
    await depService.borrarDepartamento(req.params.depId);
    res.status(204).end();
  } catch (err) { next(err); }
}
