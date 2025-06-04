import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchInscripciones(uniId, facId, depId, matId, cursoId) {
  return api.get(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/inscripciones`
  );
}
export function fetchInscripcion(uniId, facId, depId, matId, cursoId, id) {
  return api.get(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/inscripciones/${id}`
  );
}
export function createInscripcion(uniId, facId, depId, matId, cursoId, data) {
  return api.post(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/inscripciones`,
    data
  );
}
export function updateInscripcion(uniId, facId, depId, matId, cursoId, id, data) {
  return api.put(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/inscripciones/${id}`,
    data
  );
}
export function deleteInscripcion(uniId, facId, depId, matId, cursoId, id) {
  return api.delete(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/inscripciones/${id}`
  );
}
