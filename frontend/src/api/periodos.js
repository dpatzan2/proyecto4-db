import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchPeriodos(uniId) {
  return api.get(`/universidades/${uniId}/periodos`);
}
export function createPeriodo(uniId, data) {
  return api.post(`/universidades/${uniId}/periodos`, data);
}
export function updatePeriodo(uniId, id, data) {
  return api.put(`/universidades/${uniId}/periodos/${id}`, data);
}
export function deletePeriodo(uniId, id) {
  return api.delete(`/universidades/${uniId}/periodos/${id}`);
}