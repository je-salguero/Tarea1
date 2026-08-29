import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Aros from './Pages/Aros';
import Suspension from './Pages/Suspension';
import Carrito from './Pages/Carrito';
import Registro from './Pages/Registro';
import Contacto from './Pages/Contacto';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container mt-4 min-vh-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aros" element={<Aros />} />
          <Route path="/suspension" element={<Suspension />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;