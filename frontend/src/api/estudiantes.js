import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000' });

export function fetchEstudiantes(uniId, facId, depId, carId) {
  return api.get(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${carId}/estudiantes`);
}
export function createEstudiante(uniId, facId, depId, carId, data) {
  return api.post(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${carId}/estudiantes`, data);
}
export function updateEstudiante(uniId, facId, depId, carId, id, data) {
  return api.put(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${carId}/estudiantes/${id}`, data);
}
export function deleteEstudiante(uniId, facId, depId, carId, id) {
  return api.delete(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${carId}/estudiantes/${id}`);
}
