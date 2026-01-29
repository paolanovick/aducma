import Masonry from "./ui/Masonry";

export default function Servicios() {
  const novedades = [
    {
      id: "1",
      img: "/novedad-1.jpg",
      url: "#",
      height: 420,
    },
    {
      id: "2",
      img: "/novedad-2.jpg",
      url: "#",
      height: 300,
    },
    {
      id: "3",
      img: "/novedad-3.jpg",
      url: "#",
      height: 520,
    },
  ];

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
              Servicios
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-verde">Cursos y </span>
            <span className="text-verde-dark">capacitaciones</span>
          </h2>
        </div>

        {/* CURSOS Y CAPACITACIONES */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-md border border-verde/10">
            <h3 className="text-2xl font-bold text-verde mb-4">
              Cursos y capacitaciones
            </h3>

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

        {/* NOVEDADES */}
        <div>
          <h3 className="text-2xl font-bold text-verde mb-8 text-center">
            Novedades
          </h3>

          <p className="text-center text-verde/70 max-w-2xl mx-auto mb-12">
            Esta sección se irá actualizando a medida que se obtengan novedades
            sobre las causas y acciones de la asociación.
          </p>

          {/* Masonry */}
          <div className="h-[800px]">
            <Masonry
              items={novedades}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.96}
              blurToFocus
              colorShiftOnHover={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
