import { Table, Badge, Button } from 'react-bootstrap';

function Aros() {
  return (
    <div>
      <h2>Catálogo de Aros <Badge bg="success">Nuevo Ingreso</Badge></h2>
      <Table striped bordered hover className="mt-4 align-middle">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Modelo</th>
            <th>Medida</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbDFGi2UvTLMZTfw5dr-gVlojG6aGmWDQlxLxzjM_D12-j5wlLt5Fugs&s=10" 
                alt="Work Emotion CR Kai" 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} 
              />
            </td>
            <td>Work Emotion CR Kai</td>
            <td>18x9.5 +38</td>
            <td>Bronce</td>
            <td>$1,200</td>
            <td><Button variant="outline-primary" size="sm">Agregar</Button></td>
          </tr>
          <tr>
            <td>
              <img 
                src="https://www.rimstheory.ca/cdn/shop/products/face_01_d21311e3-7ca0-4002-be30-68c0b0f1d450.jpg?v=1702464572&width=416" 
                alt="Volk Racing TE37" 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} 
              />
            </td>
            <td>Volk Racing TE37</td>
            <td>17x8.5 +30</td>
            <td>Blanco</td>
            <td>$1,500</td>
            <td><Button variant="outline-primary" size="sm">Agregar</Button></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Aros;