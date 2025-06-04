import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchPlanes(uniId, facId, depId, carId) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${carId}/plan_estudios`);
}
export function createPlan(uniId, facId, depId, carId, data) {
  return api.post(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${carId}/plan_estudios`, data);
}
export function updatePlan(uniId, facId, depId, carId, id, data) {
  return api.put(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${carId}/plan_estudios/${id}`, data);
}
export function deletePlan(uniId, facId, depId, carId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${carId}/plan_estudios/${id}`);
}
