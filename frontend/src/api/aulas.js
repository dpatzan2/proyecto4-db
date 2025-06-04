import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchAulas(uniId, facId) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/aulas`);
}
export function createAula(uniId, facId, data) {
  return api.post(`/universidades/${uniId}/facultades/${facId}/aulas`, data);
}
export function updateAula(uniId, facId, id, data) {
  return api.put(`/universidades/${uniId}/facultades/${facId}/aulas/${id}`, data);
}
export function deleteAula(uniId, facId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${facId}/aulas/${id}`);
}
