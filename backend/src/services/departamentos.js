import prisma from '../prismaClient.js';

export function listarDepartamentosDeFacultad(facId) {
  return prisma.departamentos.findMany({
    where: { facultad_id: Number(facId) },
    orderBy: { nombre: 'asc' }
  });
}

export function crearDepartamento(facId, data) {
  return prisma.departamentos.create({
    data: { ...data, facultad_id: Number(facId) }
  });
}

export function obtenerDepartamento(id) {
  return prisma.departamentos.findUnique({
    where: { id: Number(id) },
    include: { carreras: true, profesores: true, materias: true }
  });
}

export function actualizarDepartamento(id, data) {
  return prisma.departamentos.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarDepartamento(id) {
  return prisma.departamentos.delete({
    where: { id: Number(id) }
  });
}
