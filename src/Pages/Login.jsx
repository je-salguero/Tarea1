import { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (nombre !== '' && email !== '' && password !== '') {
      const userData = {
        nombre: nombre, 
        correo: email,
        rol: 'Cliente VIP',
        fechaAcceso: new Date().toLocaleDateString(),
        pedidos: ['Aros Work Emotion', 'Tein Flex Z'] 
      };

      dispatch({ type: 'LOGIN', payload: userData });
      navigate('/perfil'); 
    } else {
      alert("Por favor, llena todos los campos.");
    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={5}>
        <Card className="p-4 shadow-sm">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Form onSubmit={handleLogin}>
            
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Ej. Juan Pérez"
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="tu@correo.com"
                required 
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>
            
            <Button variant="dark" type="submit" className="w-100">Entrar</Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;