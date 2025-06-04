import prisma from '../prismaClient.js';

export function listarPeriodosDeUniversidad(uniId) {
  return prisma.periodos_academicos.findMany({
    where: { universidad_id: Number(uniId) },
    orderBy: { fecha_inicio: 'desc' }
  });
}

export function crearPeriodo(uniId, data) {
  return prisma.periodos_academicos.create({ 
    data: { ...data, universidad_id: Number(uniId) } 
    });
}

export function obtenerPeriodo(id) {
  return prisma.periodos_academicos.findUnique({
    where: { id: Number(id) },
    include: { cursos: true }
  });
}

export function actualizarPeriodo(id, data) {
  return prisma.periodos_academicos.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarPeriodo(id) {
  return prisma.periodos_academicos.delete({
    where: { id: Number(id) }
  });
}
