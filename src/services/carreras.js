import prisma from '../prismaClient.js';

export function listarCarrerasDeDepartamento(depId) {
  return prisma.carreras.findMany({
    where: { departamento_id: Number(depId) },
    orderBy: { nombre: 'asc' }
  });
}

export function crearCarrera(depId, data) {
  return prisma.carreras.create({
    data: { ...data, departamento_id: Number(depId) }
  });
}

export function obtenerCarrera(id) {
  return prisma.carreras.findUnique({
    where: { id: Number(id) },
    include: { plan_estudios: true, estudiantes: true }
  });
}

export function actualizarCarrera(id, data) {
  return prisma.carreras.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarCarrera(id) {
  return prisma.carreras.delete({
    where: { id: Number(id) }
  });
}
