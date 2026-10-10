import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const carritoReducer = (state, action) => {
  switch (action.type) {
    case 'AGREGAR_AL_CARRITO':
      const index = state.findIndex(item => 
        item._id === action.payload._id || item.nombre === action.payload.nombre
      );

      if (index >= 0) {
        const nuevoEstado = [...state];
        nuevoEstado[index].cantidad += 1;
        return nuevoEstado;
      } else {
        return [...state, { ...action.payload, cantidad: 1 }];
      }
      
    case 'VACIAR_CARRITO':
      return [];
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const carritoInicial = JSON.parse(localStorage.getItem('carritoJDM')) || [];
  const [carrito, dispatchCarrito] = useReducer(carritoReducer, carritoInicial);

  useEffect(() => {
    localStorage.setItem('carritoJDM', JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CartContext.Provider value={{ carrito, dispatchCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};