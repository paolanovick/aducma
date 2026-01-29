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

// Página principal
function Home() {
  return (
    <>
      <Hero />
      <About />
      <QueHacemos />
      <Servicios />
      <ComoTeAyudamos />
      <Contacto />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-crema">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novedad/:id" element={<NovedadDetalle />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;