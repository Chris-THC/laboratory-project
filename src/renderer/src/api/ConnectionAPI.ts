import { getToken } from '@renderer/context/JWTContext/JWTContext';
import axios from 'axios';

const urlAPI: string = 'http://localhost:8081/lab';

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configura el interceptor para agregar el token antes de cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // Obtén el token dinámicamente
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
