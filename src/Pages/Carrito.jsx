import { Table, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 

function Carrito() {
  const { carrito, dispatchCarrito } = useCart();
  const { state, dispatch } = useAuth(); 

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const manejarPago = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("Por favor, inicia sesión en tu cuenta para poder realizar la compra.");
      return;
    }

    try {
      const nombresPedidos = carrito.map(item => item.nombre);

      const respuesta = await fetch('https://tarea1-ytwb.onrender.com/api/usuarios/pedidos', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token 
        },
        body: JSON.stringify({ nuevosPedidos: nombresPedidos })
      });

      if (respuesta.ok) {
        const data = await respuesta.json(); 
        
        Swal.fire({
          title: '¡Compra Exitosa!',
          text: 'Los productos se han agregado a tu historial.',
          icon: 'success',
          confirmButtonColor: '#198754'
        });

        dispatchCarrito({ type: 'VACIAR_CARRITO' });
        
        dispatch({ 
          type: 'LOGIN', 
          payload: { ...state.user, pedidos: data.pedidos } 
        });

      } else {
        const data = await respuesta.json();
        Swal.fire('Error', `Hubo un problema con la compra: ${data.mensaje}`, 'error');
      }
      
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error de conexión con el servidor.");
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
            <Button variant="success" size="lg" onClick={manejarPago}>
              Proceder al Pago
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;