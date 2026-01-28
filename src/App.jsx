import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';
import QueHacemos from "./components/QueHacemos";
import ComoTeAyudamos from "./components/ComoTeAyudamos";



function App() {
  return (
    <div className="min-h-screen bg-crema">
      <Navbar />
      <Hero />
      <About />
      <QueHacemos />
      <ComoTeAyudamos />
      <Footer />
    </div>
  );
}

export default App;
