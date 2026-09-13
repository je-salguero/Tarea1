import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">JDM Tuning Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/aros">Catálogo de Aros</Nav.Link>
            <Nav.Link as={Link} to="/suspension">Suspensión</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
            <Nav.Link as={Link} to="/registro">Crear Cuenta</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            {state.isAuthenticated ? (
              <>
                <Navbar.Text className="me-3 text-white">
                  Hola, {state.user.nombre}
                </Navbar.Text>
                <Nav.Link as={Link} to="/perfil">Mi Perfil</Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="ms-2">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-warning fw-bold">
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;