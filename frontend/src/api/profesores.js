import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchProfesores(uniId, facId, depId) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/profesores`);
}
export function createProfesor(uniId, facId, depId, data) {
  return api.post(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/profesores`, data);
}
export function updateProfesor(uniId, facId, depId, id, data) {
  return api.put(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/profesores/${id}`, data);
}
export function deleteProfesor(uniId, facId, depId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/profesores/${id}`);
}
