import { Accordion, ListGroup, Row, Col } from 'react-bootstrap';

function Suspension() {
  return (
    <div>
      <h2>Suspensión y Coilovers</h2>
      <Accordion defaultActiveKey="0" className="mt-4">
        
        <Accordion.Item eventKey="0">
          <Accordion.Header>BC Racing BR Series</Accordion.Header>
          <Accordion.Body>
            <Row className="align-items-center">
              <Col md={4} className="text-center mb-3 mb-md-0">
                <img 
                  src="https://nextgentuning.com/cdn/shop/products/Generic_Picture_9fa8c3c2-af1d-473e-a65f-cba784a505b1.jpg?v=1617168974" 
                  alt="BC Racing BR Series" 
                  style={{ width: '100%', maxWidth: '200px', borderRadius: '8px' }} 
                />
              </Col>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>Ajuste de altura independiente</ListGroup.Item>
                  <ListGroup.Item>30 niveles de dureza</ListGroup.Item>
                  <ListGroup.Item><strong>Precio:</strong> $950</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Tein Flex Z</Accordion.Header>
          <Accordion.Body>
            <Row className="align-items-center">
              <Col md={4} className="text-center mb-3 mb-md-0">
                <img 
                  src="https://zevcentric.com/cdn/shop/products/20221115-TeinFlexZ_2048x.jpg?v=1672608496" 
                  alt="Tein Flex Z" 
                  style={{ width: '100%', maxWidth: '200px', borderRadius: '8px' }} 
                />
              </Col>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>Diseño de doble tubo</ListGroup.Item>
                  <ListGroup.Item>Excelente confort para uso diario</ListGroup.Item>
                  <ListGroup.Item><strong>Precio:</strong> $850</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}

export default Suspension;