import prisma from '../prismaClient.js';

export function listarAulasDeFacultad(facId) {
  return prisma.aulas.findMany({
    where: { facultad_id: Number(facId) },
    orderBy: { nombre: 'asc' }
  });
}

export function crearAula(facId, data) {
  return prisma.aulas.create({
    data: { ...data, facultad_id: Number(facId) }
  });
}

export function obtenerAula(id) {
  return prisma.aulas.findUnique({
    where: { id: Number(id) },
    include: { horarios: true }
  });
}

export function actualizarAula(id, data) {
  return prisma.aulas.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarAula(id) {
  return prisma.aulas.delete({
    where: { id: Number(id) }
  });
}
