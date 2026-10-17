import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import api from './api';

const fncCrearTokenFalso = (segundosDeVida) => {
  const payload = { id: '1', email: 'e@x.com', role: 'admin', exp: Math.floor(Date.now() / 1000) + segundosDeVida };
  return `aaa.${btoa(JSON.stringify(payload))}.bbb`;
};

const usuarioDePrueba = { id: '1', nombre: 'Eduardo', correo: 'e@x.com', rol: 'admin', pedidos: [] };

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, '', '/');
});

test('la sesión se conserva al recargar si el token sigue vigente', () => {
  localStorage.setItem('token', fncCrearTokenFalso(300));
  localStorage.setItem('usuario', JSON.stringify(usuarioDePrueba));
  render(<App />);
  expect(screen.getByText(/Hola, Eduardo/i)).toBeInTheDocument();
});

test('al recargar con el token vencido se limpia la sesión', () => {
  localStorage.setItem('token', fncCrearTokenFalso(-10));
  localStorage.setItem('usuario', JSON.stringify(usuarioDePrueba));
  render(<App />);
  expect(screen.queryByText(/Hola, Eduardo/i)).not.toBeInTheDocument();
  expect(localStorage.getItem('token')).toBeNull();
});

test('un 401 en una petición protegida cierra sesión, avisa y redirige a /login', async () => {
  const token = fncCrearTokenFalso(300);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuarioDePrueba));
  window.history.pushState({}, '', '/aros');

  let cabeceraEnviada = null;
  // Simula al backend respondiendo 401 token_expired
  api.defaults.adapter = (config) => {
    cabeceraEnviada = config.headers.Authorization;
    return Promise.reject({
      config,
      response: { status: 401, data: { error: 'token_expired', message: 'expiró' } },
    });
  };

  render(<App />);

  expect(await screen.findByText('Su sesión ya no es válida o ha caducado')).toBeInTheDocument();
  expect(cabeceraEnviada).toBe(`Bearer ${token}`);
  expect(localStorage.getItem('token')).toBeNull();
  expect(localStorage.getItem('usuario')).toBeNull();
  expect(window.location.pathname).toBe('/login');
  await waitFor(() => expect(screen.queryByText(/Hola, Eduardo/i)).not.toBeInTheDocument());
});

test('un 401 del login (credenciales malas) no muestra el aviso de sesión vencida', async () => {
  localStorage.setItem('token', fncCrearTokenFalso(300));
  localStorage.setItem('usuario', JSON.stringify(usuarioDePrueba));
  const respuesta = { status: 401, data: { mensaje: 'Credenciales inválidas' } };
  api.defaults.adapter = (config) => Promise.reject({ config, response: respuesta });

  await expect(api.post('/auth/login', {})).rejects.toBeDefined();
  expect(screen.queryByText('Su sesión ya no es válida o ha caducado')).not.toBeInTheDocument();
  expect(localStorage.getItem('token')).not.toBeNull();
});
