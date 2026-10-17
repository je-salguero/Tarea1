import { Card, Badge, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const { state, fncCerrarSesion } = useAuth();
  const navigate = useNavigate();

  if (!state.isAuthenticated || !state.user) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">Acceso Denegado</h3>
        <p>Por favor inicia sesión para ver tu perfil.</p>
        <Button variant="primary" onClick={() => navigate('/login')}>Ir al Login</Button>
      </div>
    );
  }

  const { user } = state;

  return (
    <Row className="justify-content-center mt-4">
      <Col md={6}>
        <Card className="shadow">
          <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Dashboard de Usuario</h4>
            <Badge bg="warning" text="dark">{user.rol || 'Cliente'}</Badge>
          </Card.Header>
          <Card.Body>
            <Card.Title>{user.nombre}</Card.Title>
            <Card.Text className="text-muted">{user.correo}</Card.Text>
            <Card.Text>
              <strong>Registrado el:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Fecha no disponible'}
            </Card.Text>
            
            <h5 className="mt-4">Historial de Pedidos</h5>
            <ListGroup className="mb-4">
              {user.pedidos && user.pedidos.length > 0 ? (
                user.pedidos.map((pedido, index) => (
                  <ListGroup.Item key={index}>{pedido}</ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item className="text-muted">No tienes pedidos registrados en la base de datos.</ListGroup.Item>
              )}
            </ListGroup>

            <Button 
              variant="danger" 
              className="w-100"
              onClick={() => {
                fncCerrarSesion();
                navigate('/login');
              }}
            >
              Cerrar Sesión
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Perfil;