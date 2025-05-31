import prisma from '../prismaClient.js';

export function listarProfesoresDeDepartamento(depId) {
  return prisma.profesores.findMany({
    where: { departamento_id: Number(depId) },
    orderBy: { apellidos: 'asc' }
  });
}

export function crearProfesor(depId, data) {
  return prisma.profesores.create({
    data: { ...data, departamento_id: Number(depId) }
  });
}

export function obtenerProfesor(id) {
  return prisma.profesores.findUnique({
    where: { id: Number(id) },
    include: { cursos: true }
  });
}

export function actualizarProfesor(id, data) {
  return prisma.profesores.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarProfesor(id) {
  return prisma.profesores.delete({
    where: { id: Number(id) }
  });
}
