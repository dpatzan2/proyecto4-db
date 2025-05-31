import prisma from '../prismaClient.js';

export function listarCalificacionesDeInscripcion(insId) {
  return prisma.calificaciones.findMany({
    where: { inscripcion_id: Number(insId) }
    });
}

export function crearCalificacion(insId, data) {
  return prisma.calificaciones.create({
    data: { ...data, inscripcion_id: Number(insId)
    }
  });
}

export function obtenerCalificacion(id) {
  return prisma.calificaciones.findUnique({
    where: { id: Number(id) },
    include: { inscripcion: true }
  });
}

export function actualizarCalificacion(id, data) {
  return prisma.calificaciones.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarCalificacion(id) {
  return prisma.calificaciones.delete({
    where: { id: Number(id) }
  });
}
