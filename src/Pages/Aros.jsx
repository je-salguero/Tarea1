import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Table, Badge, Button, Spinner, Alert } from 'react-bootstrap';

function Aros() {
  const [piezas, setPiezas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatchCarrito } = useCart();

  useEffect(() => {
    const obtenerCatalogo = async () => {
      try {
        const respuesta = await fetch('http://localhost:5000/api/piezas');
        
        if (!respuesta.ok) {
          throw new Error('Error al conectar con el servidor');
        }
        
        const data = await respuesta.json();
        setPiezas(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    obtenerCatalogo();
  }, []);

  return (
    <div>
      <h2>Catálogo de Piezas <Badge bg="success">En Vivo</Badge></h2>
      
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

      {!loading && !error && (
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