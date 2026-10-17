import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AgregarPieza() {
  const { state } = useAuth();
  const navigate = useNavigate();
  
  const [pieza, setPieza] = useState({
    nombre: '', marca: '', compatibleCon: '', stock: 0, precio: 0
  });
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  if (!state.isAuthenticated || state.user?.rol !== 'admin') {
    return (
      <Container className="text-center mt-5">
        <h3 className="text-danger">Acceso Denegado</h3>
        <p>Esta área es exclusiva para administradores de JDM Tuning Store.</p>
        <Button variant="dark" onClick={() => navigate('/')}>Volver al inicio</Button>
      </Container>
    );
  }

  const manejarCambio = (e) => {
    setPieza({ ...pieza, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await api.post('/piezas', pieza);

      if (respuesta.status === 201 || respuesta.status === 200) {
        setMensaje({ texto: '¡Pieza agregada con éxito al catálogo!', tipo: 'success' });
        setPieza({ nombre: '', marca: '', compatibleCon: '', stock: 0, precio: 0 });
      }
    } catch (error) {

      const msj = error.response?.data?.mensaje || 'Error de conexión con el servidor';
      setMensaje({ texto: `Error: ${msj}`, tipo: 'danger' });
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm border-warning">
            <h2 className="text-center mb-4">⚙️ Agregar Nueva Pieza</h2>
            
            {mensaje.texto && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

            <Form onSubmit={manejarSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de la pieza</Form.Label>
                    <Form.Control type="text" name="nombre" value={pieza.nombre} onChange={manejarCambio} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" name="marca" value={pieza.marca} onChange={manejarCambio} required />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Compatible Con</Form.Label>
                <Form.Control type="text" name="compatibleCon" value={pieza.compatibleCon} onChange={manejarCambio} required />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Stock (Cantidad)</Form.Label>
                    <Form.Control type="number" name="stock" value={pieza.stock} onChange={manejarCambio} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Precio ($)</Form.Label>
                    <Form.Control type="number" name="precio" value={pieza.precio} onChange={manejarCambio} required />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="warning" type="submit" className="w-100 fw-bold">
                Guardar en Inventario
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AgregarPieza;