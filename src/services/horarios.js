import prisma from '../prismaClient.js';

export function listarHorariosDeCurso(cursoId) {
  return prisma.horarios.findMany({
    where: { curso_id: Number(cursoId) },
    orderBy: { dia_semana: 'asc' }
  });
}

export function crearHorario(cursoId, data) {
  return prisma.horarios.create({
    data: { ...data, curso_id:    Number(cursoId) }
  });
}

export function obtenerHorario(id) {
  return prisma.horarios.findUnique({
    where: { id: Number(id) }
  });
}

export function actualizarHorario(id, data) {
  return prisma.horarios.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarHorario(id) {
  return prisma.horarios.delete({
    where: { id: Number(id) }
  });
}
