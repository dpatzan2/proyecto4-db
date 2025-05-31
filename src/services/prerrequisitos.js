import prisma from '../prismaClient.js';

export function listarPrerrequisitosDeMateria(matId) {
  return prisma.prerrequisitos.findMany({
    where: { materia_id: Number(matId) },
    include: { prerrequisito: true }
  });
}

export function crearPrerrequisito(matId, data) {
  return prisma.prerrequisitos.create({
    data: {
      ...data,
      materia_id: Number(matId)
      }
  });
}

export function borrarPrerrequisito(id) {
  return prisma.prerrequisitos.delete({
    where: { id: Number(id) }
  });
}
