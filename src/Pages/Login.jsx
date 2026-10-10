import { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    
    if (email !== '' && password !== '') {
      try {
        const respuesta = await fetch('https://tarea1-ytwb.onrender.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            correo: email, 
            password: password 
          })
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
          localStorage.setItem('token', data.token);
          
          dispatch({ type: 'LOGIN', payload: data.usuario });
          
          navigate('/perfil'); 
        } else {
          setError(data.mensaje || 'Error al iniciar sesión');
        }
      } catch (err) {
        console.error(err);
        setError("Error de conexión con el servidor backend.");
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
          
          {/*Alerta por si tengo errores */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
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