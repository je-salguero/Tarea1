// Funciones sencillas para guardar y revisar la sesión en localStorage

// Lee la parte del medio del JWT (el payload) para saber cuándo vence
export const fncLeerDatosDelToken = (token) => {
  try {
    const parteMedia = token.split('.')[1];
    // El JWT usa base64 "url safe", hay que cambiar - y _ para poder usar atob
    const base64 = parteMedia.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (error) {
    return null;
  }
};

// Devuelve true solo si el token existe y todavía no pasó su fecha de expiración (exp viene en segundos)
export const fncTokenVigente = (token) => {
  const datos = fncLeerDatosDelToken(token);
  return Boolean(datos && datos.exp && datos.exp * 1000 > Date.now());
};

// Borra el token y los datos del usuario guardados en el navegador
export const fncBorrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

// Al recargar la página, recupera la sesión solo si el token sigue siendo válido
export const fncRecuperarSesion = () => {
  try {
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (token && usuario && fncTokenVigente(token)) {
      return usuario;
    }
  } catch (error) {
    // Si el JSON guardado está dañado, simplemente se limpia la sesión
  }
  fncBorrarSesion();
  return null;
};
