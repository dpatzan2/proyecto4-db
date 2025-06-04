import prisma from '../prismaClient.js';

export function listarMateriasDeDepartamento(depId) {
  return prisma.materias.findMany({
    where: { departamento_id: Number(depId) },
    orderBy: { nombre: 'asc' }
  });
}

export function crearMateria(depId, data) {
  return prisma.materias.create({
    data: { ...data, departamento_id: Number(depId) }
  });
}

export function obtenerMateria(id) {
  return prisma.materias.findUnique({
    where: { id: Number(id) },
    include: {
      prerrequisitos: true,
      prerrequisitos_de: true,
      cursos: true
    }
  });
}

export function actualizarMateria(id, data) {
  return prisma.materias.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarMateria(id) {
  return prisma.materias.delete({
    where: { id: Number(id) }
  });
}
