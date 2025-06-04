import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchFacultades(uniId) {
  return api.get(`/universidades/${uniId}/facultades`);
}
export function fetchFacultad(uniId, id) {
  return api.get(`/universidades/${uniId}/facultades/${id}`);
}
export function createFacultad(uniId, data) {
  return api.post(`/universidades/${uniId}/facultades`, data);
}
export function updateFacultad(uniId, id, data) {
  return api.put(`/universidades/${uniId}/facultades/${id}`, data);
}
export function deleteFacultad(uniId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${id}`);
}