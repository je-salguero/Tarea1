import 'bootstrap/dist/css/bootstrap.min.css';
import AgregarPieza from './Pages/AgregarPieza'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Aros from './Pages/Aros';
import Suspension from './Pages/Suspension';
import Carrito from './Pages/Carrito';
import Registro from './Pages/Registro';
import Contacto from './Pages/Contacto';
import Login from './Pages/Login';
import Perfil from './Pages/Perfil';
import SesionExpirada from './components/SesionExpirada';

function App() {
  return (
    <AuthProvider>
      <CartProvider> 
        <Router>
          <Navigation />
          <SesionExpirada />
          <div className="container mt-4 min-vh-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aros" element={<Aros />} />
              <Route path="/suspension" element={<Suspension />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/agregar-pieza" element={<AgregarPieza />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;