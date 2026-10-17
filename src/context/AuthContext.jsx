import { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { fncBorrarSesion, fncRecuperarSesion } from '../utils/sesion';

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null };
    case 'UPGRADE_MEMBERSHIP':
      return { ...state, user: { ...state.user, rol: action.payload } };
    case 'ADD_PURCHASE':
      return { ...state, user: { ...state.user, pedidos: [...state.user.pedidos, action.payload] } };
    default:
      return state;
  }
}

function fncCrearEstadoInicial() {
  const usuario = fncRecuperarSesion();
  return { isAuthenticated: Boolean(usuario), user: usuario };
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, null, fncCrearEstadoInicial);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('usuario', JSON.stringify(state.user));
    }
  }, [state.user]);

  const fncCerrarSesion = useCallback(() => {
    fncBorrarSesion();
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch, fncCerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
