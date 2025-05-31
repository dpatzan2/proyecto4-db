import prisma from '../prismaClient.js';

export function listarFacultadesDeUniversidad(uniId) {
  return prisma.facultades.findMany({
    where: { universidad_id: Number(uniId) },
    orderBy: { nombre: 'asc' }
  });
}

export function crearFacultad(uniId, data) {
  return prisma.facultades.create({
    data: { ...data, universidad_id: Number(uniId) }
  });
}

export function obtenerFacultad(id) {
  return prisma.facultades.findUnique({
    where: { id: Number(id) },
    include: { departamentos: true }
  });
}

export function actualizarFacultad(id, data) {
  return prisma.facultades.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarFacultad(id) {
  return prisma.facultades.delete({
    where: { id: Number(id) }
  });
}
