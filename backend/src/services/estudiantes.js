import prisma from '../prismaClient.js';

export function listarEstudiantesDeCarrera(carId) {
  return prisma.estudiantes.findMany({
    where: { carrera_id: Number(carId) },
    orderBy: { apellidos: 'asc' }
  });
}

export function crearEstudiante(carId, data) {
  return prisma.estudiantes.create({
    data: { ...data, carrera_id: Number(carId) }
  });
}

export function obtenerEstudiante(id) {
  return prisma.estudiantes.findUnique({
    where: { id: Number(id) },
    include: { inscripciones: true }
  });
}

export function actualizarEstudiante(id, data) {
  return prisma.estudiantes.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarEstudiante(id) {
  return prisma.estudiantes.delete({
    where: { id: Number(id) }
  });
}
