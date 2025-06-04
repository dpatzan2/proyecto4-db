import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export function fetchUniversidades() {
  return api.get('/universidades');
}

export function createUniversidad(data) {
  return api.post('/universidades', data);
}

export function updateUniversidad(id, data) {
  return api.put(`/universidades/${id}`, data);
}

export function fetchUniversidad(id) {
  return api.get(`/universidades/${id}`);
}

