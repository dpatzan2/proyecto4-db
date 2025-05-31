import * as carService from '../services/carreras.js';

export async function listarCarreras(req, res, next) {
  try {
    const list = await carService.listarCarrerasDeDepartamento(req.params.depId);
    res.json(list);
  } catch (err) { next(err); }
}

export async function crearCarrera(req, res, next) {
  try {
    const nueva = await carService.crearCarrera(req.params.depId, req.body);
    res.status(201).json(nueva);
  } catch (err) { next(err); }
}

export async function obtenerCarrera(req, res, next) {
  try {
    const car = await carService.obtenerCarrera(req.params.carId);
    res.json(car);
  } catch (err) { next(err); }
}

export async function actualizarCarrera(req, res, next) {
  try {
    const updated = await carService.actualizarCarrera(req.params.carId, req.body);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function borrarCarrera(req, res, next) {
  try {
    await carService.borrarCarrera(req.params.carId);
    res.status(204).end();
  } catch (err) { next(err); }
}