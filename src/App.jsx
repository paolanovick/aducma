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
import CursoDetalle from "./pages/CursoDetalle";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import NovedadesAdmin from "./pages/NovedadesAdmin";
import CursosAdmin from "./pages/CursosAdmin";
import InscripcionesAdmin from "./pages/InscripcionesAdmin";
import AdhesionesAdmin from "./pages/AdhesionesAdmin";

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
          <Route
            path="/novedad/:id"
            element={
              <>
                <Navbar />
                <NovedadDetalle />
                <Footer />
              </>
            }
          />
          <Route
            path="/curso/:id"
            element={
              <>
                <Navbar />
                <CursoDetalle />
                <Footer />
              </>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/novedades" element={<NovedadesAdmin />} />
          <Route path="/dashboard/cursos" element={<CursosAdmin />} />
          <Route
            path="/dashboard/inscripciones"
            element={<InscripcionesAdmin />}
          />
          <Route path="/dashboard/adhesiones" element={<AdhesionesAdmin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;