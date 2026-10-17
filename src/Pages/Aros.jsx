import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Table, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

function Aros() {
  const [piezas, setPiezas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatchCarrito } = useCart();
  const { state } = useAuth();

  useEffect(() => {
    if (!state.isAuthenticated) {
      setLoading(false);
      return;
    }

    const fncObtenerCatalogo = async () => {
      try {
        const respuesta = await api.get('/piezas');
        setPiezas(respuesta.data);
        setError(null);
      } catch (err) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fncObtenerCatalogo();
  }, [state.isAuthenticated]);

  return (
    <div>
      <h2>Catálogo de Piezas <Badge bg="success">En Vivo</Badge></h2>
      
      {!state.isAuthenticated && (
        <Alert variant="warning" className="mt-4">
          Debes <Link to="/login">iniciar sesión</Link> para ver el catálogo.
        </Alert>
      )}

      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Cargando inventario desde la base de datos...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mt-4">
          Ocurrió un problema: {error}
        </Alert>
      )}

      {state.isAuthenticated && !loading && !error && (
        <Table striped bordered hover className="mt-4 align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Compatible Con</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {piezas.length > 0 ? (
              piezas.map((pieza) => (
                <tr key={pieza._id}>
                  <td>{pieza.nombre}</td>
                  <td>{pieza.marca}</td>
                  <td>{pieza.compatibleCon}</td>
                  <td>
                    {pieza.stock > 0 ? (
                      <Badge bg="info">{pieza.stock} disponibles</Badge>
                    ) : (
                      <Badge bg="danger">Agotado</Badge>
                    )}
                  </td>
                  <td>${pieza.precio}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      disabled={pieza.stock === 0}
                      onClick={() => dispatchCarrito({ type: 'AGREGAR_AL_CARRITO', payload: pieza })}
                    >
                      Agregar al Carrito
                    </Button> 
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No hay piezas registradas en el catálogo.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Aros;