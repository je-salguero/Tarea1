import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setExito(false);

    try {
      const respuesta = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          nombre, 
          correo, 
          password, 
          rol: 'cliente'
        })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        setExito(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.mensaje || 'Hubo un error al crear la cuenta');
      }
    } catch (err) {
      setError('Error de conexión con el servidor backend.');
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Crear una Cuenta</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            {exito && <Alert variant="success">¡Cuenta creada con éxito! Redirigiendo al login...</Alert>}

            <Form onSubmit={manejarRegistro}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. José Salguero" 
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="tu@correo.com" 
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres" 
                  required
                  minLength={8}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-2">
                Registrarme
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registro;