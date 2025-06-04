import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchPre(uniId, facId, depId, matId) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/prerrequisitos`);
}
export function createPre(uniId, facId, depId, matId, data) {
  return api.post(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/prerrequisitos`, data);
}
export function deletePre(uniId, facId, depId, matId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${matId}/prerrequisitos/${id}`);
}
