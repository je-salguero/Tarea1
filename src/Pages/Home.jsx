import { Carousel, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

function Home() {
  return (
    <div>
      <h1 className="text-center mb-4">Bienvenido a JDM Tuning Store</h1>
      
      <Carousel className="mb-5">
        <Carousel.Item>
          <img 
            className="d-block w-100" 
            src="https://www.vividracing.com/blog/wp-content/uploads/Work-Emotion-CR3P-Banner.jpg" 
            alt="Aros Work Emotion CR3P" 
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-75 p-2 rounded d-none d-md-block mx-auto" style={{ maxWidth: '60%' }}>
            <h3>Promoción en aros </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className="d-block w-100" 
            src="https://fractionmotors.com/_next/image?url=https%3A%2F%2Fipfs.fractionmotors.com%2Fipfs%2FQmS5Ye3pQ2MhnLhWBLPAqrKKd63aGyCDsDjfxKLwS98XMU&w=3840&q=75" 
            alt="Toyota Supra MK4" 
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-75 p-2 rounded d-none d-md-block mx-auto" style={{ maxWidth: '60%' }}>
            <h3>Aros japoneses auténticos en inventario</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h2 className="mb-4">Productos Destacados</h2>
      <Row className="g-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Img 
                variant="top" 
                src="https://www.rimstheory.ca/cdn/shop/products/face_01_d21311e3-7ca0-4002-be30-68c0b0f1d450.jpg?v=1702464572&width=416" 
                style={{ height: '200px', objectFit: 'cover' }} 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Volk Racing TE37</Card.Title>
              <Card.Text>Aros forjados japoneses, medida 17x8.5.</Card.Text>
              <Button as={Link} to="/aros" variant="primary" className="mt-auto">Ver detalles</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100">
            <Card.Img 
                variant="top" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbDFGi2UvTLMZTfw5dr-gVlojG6aGmWDQlxLxzjM_D12-j5wlLt5Fugs&s=10" 
                style={{ height: '200px', objectFit: 'cover' }} 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Work Emotion CR Kai</Card.Title>
              <Card.Text>Acabado en bronce, medida 18x9.5 +38.</Card.Text>
              <Button as={Link} to="/aros" variant="primary" className="mt-auto">Ver detalles</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100">
            <Card.Img 
                variant="top" 
                src="https://nextgentuning.com/cdn/shop/products/Generic_Picture_9fa8c3c2-af1d-473e-a65f-cba784a505b1.jpg?v=1617168974" 
                style={{ height: '200px', objectFit: 'cover' }} 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>BC Racing BR Series</Card.Title>
              <Card.Text>Ajuste de altura independiente y 30 niveles de dureza.</Card.Text>
              <Button as={Link} to="/suspension" variant="primary" className="mt-auto">Ver detalles</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100">
            <Card.Img 
                variant="top" 
                src="https://zevcentric.com/cdn/shop/products/20221115-TeinFlexZ_2048x.jpg?v=1672608496" 
                style={{ height: '200px', objectFit: 'cover' }} 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Tein Flex Z</Card.Title>
              <Card.Text>Diseño de doble tubo, excelente confort para uso diario.</Card.Text>
              <Button as={Link} to="/suspension" variant="primary" className="mt-auto">Ver detalles</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;