import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fncRegistrarManejadorSesionExpirada } from '../api';

function SesionExpirada() {
  const { fncCerrarSesion } = useAuth();
  const navigate = useNavigate();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const fncAlExpirarSesion = () => {
      fncCerrarSesion();
      setMostrarMensaje(true);
      navigate('/login');
    };

    fncRegistrarManejadorSesionExpirada(fncAlExpirarSesion);

    return () => fncRegistrarManejadorSesionExpirada(null);
  }, [fncCerrarSesion, navigate]);

  return (
    <Modal show={mostrarMensaje} onHide={() => setMostrarMensaje(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sesión finalizada</Modal.Title>
      </Modal.Header>
      <Modal.Body>Su sesión ya no es válida o ha caducado</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={() => setMostrarMensaje(false)}>
          Entendido
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SesionExpirada;
