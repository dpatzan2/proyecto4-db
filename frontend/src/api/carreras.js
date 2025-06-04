import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchCarreras(uniId, facId, depId) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras`);
}
export function fetchCarrera(uniId, facId, depId, id) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${id}`);
}
export function createCarrera(uniId, facId, depId, data) {
  return api.post(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras`, data);
}
export function updateCarrera(uniId, facId, depId, id, data) {
  return api.put(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${id}`, data);
}
export function deleteCarrera(uniId, facId, depId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${id}`);
}
