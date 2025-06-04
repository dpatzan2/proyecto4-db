import prisma from '../prismaClient.js';

export function listarPlanDeCarrera(carId) {
  return prisma.plan_estudios.findMany({
    where: { carrera_id: Number(carId) },
    include: { materia: true },
    orderBy: { semestre_sugerido: 'asc' }
  });
}

export function crearPlanEstudio(carId, data) {
  return prisma.plan_estudios.create({
    data: { ...data, carrera_id: Number(carId) }
  });
}

export function obtenerPlanEstudio(id) {
  return prisma.plan_estudios.findUnique({
    where: { id: Number(id) },
    include: { carrera: true, materia: true }
  });
}

export function actualizarPlanEstudio(id, data) {
  return prisma.plan_estudios.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarPlanEstudio(id) {
  return prisma.plan_estudios.delete({
    where: { id: Number(id) }
  });
}
