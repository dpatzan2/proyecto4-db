import prisma from '../prismaClient.js';

export function listarInscripcionesDeCurso(cursoId) {
  return prisma.inscripciones.findMany({
    where: { curso_id: Number(cursoId) },
    include: { estudiante: true },
    orderBy: { fecha_inscripcion: 'desc' }
  });
}

export function crearInscripcion(cursoId, data) {
  return prisma.inscripciones.create({
    data: {
      curso_id:         Number(cursoId),
      estudiante_id:    Number(data.estudiante_id),
      fecha_inscripcion: data.fecha_inscripcion, // opcional
      estado:           data.estado
    }
  });
}

export function obtenerInscripcion(id) {
  return prisma.inscripciones.findUnique({
    where: { id: Number(id) },
    include: { curso: true, estudiante: true, calificaciones: true }
  });
}

export function actualizarInscripcion(id, data) {
  return prisma.inscripciones.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarInscripcion(id) {
  return prisma.inscripciones.delete({
    where: { id: Number(id) }
  });
}
