import { createContext, useReducer, useContext } from 'react';

const initialState = {
  isAuthenticated: false,
  user: null,
};

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

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);