import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchCursos(uniId, facId, depId, matId) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos`);
}

export function fetchCurso(uniId, facId, depId, matId, id) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${id}`);
}

export function createCurso(uniId, facId, depId, matId, data) {
  return api.post(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos`, data );
}

export function updateCurso(uniId, facId, depId, matId, id, data) {
  return api.put(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${id}`, data);
}

export function deleteCurso(uniId, facId, depId, matId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/cursos/${id}`);
}
