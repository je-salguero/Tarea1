import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function Registro() {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Crear una Cuenta</h2>
            <Form>
              <Form.Group className="mb-3" controlId="nombreRegistro">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control type="text" placeholder="Ej. José Salguero" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="correoRegistro">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="tu@correo.com" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="passwordRegistro">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Mínimo 8 caracteres" />
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