import prisma from '../prismaClient.js';

export function listarUniversidades() {
  return prisma.universidades.findMany({
    orderBy: { id: 'asc' }
  });
}

export function crearUniversidad(data) {
  return prisma.universidades.create({ data });
}

export function obtenerUniversidad(id) {
  return prisma.universidades.findUnique({
    where: { id: Number(id) },
    include: { facultades: true }
  });
}

export function actualizarUniversidad(id, data) {
  return prisma.universidades.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarUniversidad(id) {
  return prisma.universidades.delete({
    where: { id: Number(id) }
  });
}