import { Table, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api';

function Carrito() {
  const { carrito, dispatchCarrito } = useCart();
  const { state, dispatch } = useAuth(); 

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const fncProcederPago = async () => {
    if (!state.isAuthenticated) {
      Swal.fire('Inicia sesión', 'Por favor, inicia sesión en tu cuenta para poder realizar la compra.', 'info');
      return;
    }

    try {
      const nombresPedidos = carrito.map(item => item.nombre);

      const respuesta = await api.put('/usuarios/pedidos', { nuevosPedidos: nombresPedidos });

      Swal.fire({
        title: '¡Compra Exitosa!',
        text: 'Los productos se han agregado a tu historial.',
        icon: 'success',
        confirmButtonColor: '#198754'
      });

      dispatchCarrito({ type: 'VACIAR_CARRITO' });

      dispatch({
        type: 'LOGIN',
        payload: { ...state.user, pedidos: respuesta.data.pedidos }
      });

    } catch (error) {
      if (error.response?.status === 401) {
        return;
      }
      if (error.response) {
        Swal.fire('Error', `Hubo un problema con la compra: ${error.response.data.mensaje}`, 'error');
      } else {
        Swal.fire('Error', 'Error de conexión con el servidor.', 'error');
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4">Tu Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <Alert variant="info">Tu carrito está vacío. ¡Ve al catálogo para agregar productos!</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Marca</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.marca}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precio}</td>
                  <td>${item.precio * item.cantidad}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" className="text-end"><strong>Total a Pagar:</strong></td>
                <td><strong>${total}</strong></td>
              </tr>
            </tbody>
          </Table>
          <div className="text-end mt-3">
            <Button variant="success" size="lg" onClick={fncProcederPago}>
              Proceder al Pago
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;