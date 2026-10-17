import { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const fncIniciarSesion = async (e) => {
    e.preventDefault();
    setError(''); 
    
    if (email !== '' && password !== '') {
      try {
        const respuesta = await api.post('/auth/login', { 
          correo: email, 
          password: password 
        });

        if (respuesta.status === 200) {
          localStorage.setItem('token', respuesta.data.token);
          
          dispatch({ type: 'LOGIN', payload: respuesta.data.usuario });
          
          navigate('/perfil'); 
        }
      } catch (err) {
        console.error(err);
        const msj = err.response?.data?.mensaje || err.response?.data?.error || "Error al iniciar sesión.";
        setError(msj);
      }
    } else {
      setError("Por favor, llena todos los campos.");
    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={5}>
        <Card className="p-4 shadow-sm">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={fncIniciarSesion}>
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