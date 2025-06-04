import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchMaterias(uniId, facId, depId) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias`);
}
export function fetchMateria(uniId, facId, depId, id) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${id}`);
}
export function createMateria(uniId, facId, depId, data) {
  return api.post(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias`, data);
}
export function updateMateria(uniId, facId, depId, id, data) {
  return api.put(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${id}`, data);
}
export function deleteMateria(uniId, facId, depId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${id}`);
}
