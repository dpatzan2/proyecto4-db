import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchHorarios(uniId, facId, depId, matId, cursoId) {
  return api.get(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/horarios`
  );
}
export function fetchHorario(uniId, facId, depId, matId, cursoId, id) {
  return api.get(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/horarios/${id}`
  );
}
export function createHorario(uniId, facId, depId, matId, cursoId, data) {
  return api.post(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/horarios`,
    data
  );
}
export function updateHorario(uniId, facId, depId, matId, cursoId, id, data) {
  return api.put(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/horarios/${id}`,
    data
  );
}
export function deleteHorario(uniId, facId, depId, matId, cursoId, id) {
  return api.delete(
    `/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${cursoId}/horarios/${id}`
  );
}