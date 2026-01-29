import Masonry from "./ui/Masonry";

export default function Servicios() {
  const novedades = [
   {
      id: "1",
      img: "https://www.freepik.es/foto-gratis/tomada-vertical-hermosa-toma-bosque-arboles-altos-sol-brillando-fondo_8280858.htm#fromView=search&page=1&position=12&uuid=a748e400-463c-4d7e-b7a0-83908972afd6&query=ambiente+natural",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://www.freepik.es/foto-gratis/viajero-asiatico-joven-feliz-mujer-mochila-que-camina-bosque_4014385.htm#fromView=search&page=1&position=27&uuid=a748e400-463c-4d7e-b7a0-83908972afd6&query=ambiente+natural",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://www.freepik.es/foto-gratis/mujer-tiro-medio-posando-hoja_13436448.htm#fromView=search&page=2&position=15&uuid=a748e400-463c-4d7e-b7a0-83908972afd6&query=ambiente+natural",
      url: "https://example.com/three",
      height: 600,
      },
     {
      id: "4",
      img: "https://www.freepik.es/foto-gratis/tomada-vertical-hermosa-toma-bosque-arboles-altos-sol-brillando-fondo_8280858.htm#fromView=search&page=1&position=12&uuid=a748e400-463c-4d7e-b7a0-83908972afd6&query=ambiente+natural",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "5",
      img: "https://www.freepik.es/foto-gratis/viajero-asiatico-joven-feliz-mujer-mochila-que-camina-bosque_4014385.htm#fromView=search&page=1&position=27&uuid=a748e400-463c-4d7e-b7a0-83908972afd6&query=ambiente+natural",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "6",
      img: "https://www.freepik.es/foto-gratis/mujer-tiro-medio-posando-hoja_13436448.htm#fromView=search&page=2&position=15&uuid=a748e400-463c-4d7e-b7a0-83908972afd6&query=ambiente+natural",
      url: "https://example.com/three",
      height: 600,
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
          <div className="relative h-[800px]">
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
