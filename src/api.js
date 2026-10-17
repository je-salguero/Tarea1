import axios from 'axios';


const URL_PRODUCCION = 'https://tarea1-ytwb.onrender.com/api';
const URL_LOCAL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ||
    (process.env.NODE_ENV === 'production' ? URL_PRODUCCION : URL_LOCAL),
});

let manejadorSesionExpirada = null;

export const fncRegistrarManejadorSesionExpirada = (funcion) => {
  manejadorSesionExpirada = funcion;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const esLogin = error.config?.url?.includes('/auth/login');
    const habiaSesion = Boolean(localStorage.getItem('token'));

    if (status === 401 && !esLogin && habiaSesion && manejadorSesionExpirada) {
      manejadorSesionExpirada();
    }
    return Promise.reject(error);
  }
);

export default api;
