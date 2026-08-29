import { Table, Button } from 'react-bootstrap';

function Carrito() {
  return (
    <div>
      <h2 className="mb-4">Tu Carrito de Compras</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Aros Work Emotion CR Kai</td>
            <td>1</td>
            <td>$1,200</td>
            <td>$1,200</td>
          </tr>
          <tr>
            <td>Coilovers BC Racing</td>
            <td>1</td>
            <td>$950</td>
            <td>$950</td>
          </tr>
          <tr>
            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
            <td><strong>$2,150</strong></td>
          </tr>
        </tbody>
      </Table>
      <div className="text-end mt-3">
        <Button variant="success" size="lg">Proceder al Pago</Button>
      </div>
    </div>
  );
}

export default Carrito;