import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
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
            <Nav.Link as={Link} to="/aros">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/suspension">Próximos productos</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            
            {state.isAuthenticated && state.user?.rol === 'admin' && (
              <Nav.Link as={Link} to="/agregar-pieza" className="text-warning fw-bold">
                + Nuevo Producto
              </Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto align-items-center">
            {state.isAuthenticated ? (
              <>
                <span className="text-light me-3">Hola, {state.user.nombre}</span>
                <Nav.Link as={Link} to="/perfil" className="me-2 text-white">Mi Perfil</Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={cerrarSesion}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/registro">Crear Cuenta</Nav.Link>
                <Nav.Link as={Link} to="/login" className="text-warning fw-bold">Iniciar Sesión</Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;