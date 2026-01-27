import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-verde">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
            <path d="M32 8 C20 16, 16 31, 32 48 C48 31, 44 16, 32 8" fill="white" />
            <path d="M32 14 L32 42" stroke="#318223" strokeWidth="2" opacity="0.5" />
            <path d="M32 22 L26 28" stroke="#318223" strokeWidth="1.5" opacity="0.4" />
            <path d="M32 28 L38 34" stroke="#318223" strokeWidth="1.5" opacity="0.4" />
          </svg>
          <span className="font-bold text-xl text-white">ADUCMA</span>
        </div>

        {/* Links desktop */}
        <div className="hidden md:flex gap-6">
          <a href="#inicio" className="text-white/80 hover:text-white">Inicio</a>
          <a href="#nosotros" className="text-white/80 hover:text-white">Nosotros</a>
          <a href="#servicios" className="text-white/80 hover:text-white">Servicios</a>
          <a href="#contacto" className="text-white/80 hover:text-white">Contacto</a>
        </div>

        {/* Botón hamburguesa móvil */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-verde border-t border-white/20 px-6 py-4">
          <a href="#inicio" className="block py-2 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#nosotros" className="block py-2 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Nosotros</a>
          <a href="#servicios" className="block py-2 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#contacto" className="block py-2 text-white/80 hover:text-white" onClick={() => setMenuOpen(false)}>Contacto</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;