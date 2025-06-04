import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchDepartamentos(uniId, facId) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos`);
}
export function fetchDepartamento(uniId, facId, id) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${id}`);
}
export function createDepartamento(uniId, facId, data) {
  return api.post(`/universidades/${uniId}/facultades/${facId}/departamentos`, data);
}
export function updateDepartamento(uniId, facId, id, data) {
  return api.put(`/universidades/${uniId}/facultades/${facId}/departamentos/${id}`, data);
}
export function deleteDepartamento(uniId, facId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${facId}/departamentos/${id}`);
}
