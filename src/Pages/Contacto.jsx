import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Contacto() {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Contáctanos</h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form className="bg-light p-4 rounded border">
            <Form.Group className="mb-3" controlId="asuntoContacto">
              <Form.Label>Motivo de contacto:</Form.Label>
              <Form.Select>
                <option value="duda">Duda sobre compatibilidad de repuestos</option>
                <option value="envio">Problemas con mi envío</option>
                <option value="cotizacion">Cotización especial para proyecto</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="mensajeContacto">
              <Form.Label>Tu mensaje:</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Escribe los detalles del vehículo y tu consulta..." />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Enviar Mensaje
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;