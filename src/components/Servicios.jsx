import { useEffect, useState } from "react";
import Masonry from "./ui/Masonry";

const API = import.meta.env.VITE_API_URL;

export default function Servicios() {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);

useEffect(() => {
  const cargarDatos = async () => {
    try {
      // Cargar novedades
      const resNovedades = await fetch(`${API}/api/novedades`);
      const novedades = await resNovedades.json();
      const novedadesConTipo = novedades.map(n => ({ ...n, tipo: "novedad" }));
      
      // Cargar cursos
      const resCursos = await fetch(`${API}/api/cursos`);
      const cursos = await resCursos.json();
      const cursosConTipo = cursos.map(c => ({ ...c, tipo: "curso" }));
      
      // Mezclamos todo
      const todos = [...novedadesConTipo, ...cursosConTipo];
      
      setItems(todos);
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setCargando(false);
    }
  };

  cargarDatos();
}, []);

  return (
    <div
      id="servicios"
      className="relative bg-crema py-24 overflow-hidden scroll-mt-24"
    >
      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-verde/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-verde-light/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-verde/20 backdrop-blur-sm border border-verde/30 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-verde rounded-full animate-pulse" />
            <span className="text-verde text-sm font-medium tracking-wider uppercase">
              Actividades
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-verde">Cursos y </span>
            <span className="text-verde-light">Novedades</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-verde/50" />
            <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-verde/50" />
          </div>
        </div>

        {/* TEXTO INTRODUCTORIO */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-md border border-verde/10">
            <p className="text-verde/80 leading-relaxed mb-4">
              La Asociación tiene como misión esencial difundir a la comunidad en
              general y a cada caso en particular todos los detalles respecto de
              la legislación vigente tanto en materia ambiental como en protección
              animal y en derecho de consumidores y usuarios.
            </p>

            <p className="text-verde/80 leading-relaxed">
              A tal fin, ADUCMA organiza en forma permanente cursos abiertos a la
              comunidad y capacitaciones puntuales destinadas a profesionales
              adherentes para casos concretos.
            </p>
          </div>
        </div>

        {/* GALERÍA MASONRY */}
        <div>
          <p className="text-center text-verde/70 max-w-2xl mx-auto mb-12">
            Explorá nuestros cursos y novedades. Hacé click en cualquier tarjeta para ver más detalles.
          </p>

         <div className="relative">

            {cargando ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-12 w-12 border-4 border-verde border-t-transparent rounded-full"></div>
              </div>
            ) : items.length === 0 ? (
              <p className="text-center text-verde/60 py-20">
                Próximamente más contenido...
              </p>
            ) : (
              <Masonry
                items={items}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover
                hoverScale={0.96}
                blurToFocus
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}