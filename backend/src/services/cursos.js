import prisma from '../prismaClient.js';

export function listarCursosDeMateria(matId) {
  return prisma.cursos.findMany({
    where: { materia_id: Number(matId) },
    include: { profesor: true, periodo_academico: true }
    });
}

export function crearCursoDeMateria(matId, data) {
  return prisma.cursos.create({
    data: { ...data, materia_id: Number(matId) }
  });
}

export function obtenerCurso(id) {
  return prisma.cursos.findUnique({
    where: { id: Number(id) },
    include: { materia: true, profesor: true, inscripciones: true, periodo_academico: true, inscripciones: true }
  });
}

export function actualizarCurso(id, data) {
  return prisma.cursos.update({
    where: { id: Number(id) },
    data
  });
}

export function borrarCurso(id) {
  return prisma.cursos.delete({
    where: { id: Number(id) }
  });
}
