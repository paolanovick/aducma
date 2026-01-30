import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';
import QueHacemos from "./components/QueHacemos";
import ComoTeAyudamos from "./components/ComoTeAyudamos";
import Contacto from "./components/Contacto";
import Servicios from "./components/Servicios";
import NovedadDetalle from "./pages/NovedadDetalle";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <QueHacemos />
      <Servicios />
      <ComoTeAyudamos />
      <Contacto />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-crema">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novedad/:id" element={<><Navbar /><NovedadDetalle /><Footer /></>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;