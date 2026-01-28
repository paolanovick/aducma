import { useEffect } from "react";

export default function ComoTeAyudamos() {
  const pasos = [
    {
      titulo: "Recibimos tu consulta o denuncia",
      texto: "Escuchamos tu situación con atención, confidencialidad y compromiso.",
      imagen: "/contaminacion.jpg",
    },
    {
      titulo: "Analizamos la situación",
      texto: "Evaluamos el caso considerando el contexto y la normativa vigente.",
      imagen: "/rescate.jpg",
    },
    {
      titulo: "Orientamos sobre los pasos a seguir",
      texto: "Brindamos información clara y responsable para que sepas cómo proceder.",
      imagen: "/incendio.jpg",
    },
    {
      titulo: "Acompañamos y realizamos seguimiento",
      texto: "Acompañamos el proceso cuando la situación lo requiere.",
      imagen: "/edAmbiental.jpg",
    },
  ];

  // Precargar imágenes para que el efecto sea más rápido
  useEffect(() => {
    pasos.forEach((paso) => {
      const img = new Image();
      img.src = paso.imagen;
    });
  }, []);

  return (
  <section className="bg-verde py-24 relative overflow-hidden">
  
  {/* CONTENIDO */}
  <div className="max-w-7xl mx-auto px-6">

    {/* HEADER */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-crema/20 backdrop-blur-sm border border-crema/30 rounded-full px-5 py-2 mb-6">
        <span className="w-2 h-2 bg-crema rounded-full animate-pulse" />
        <span className="text-crema text-sm font-medium tracking-wider uppercase">
          Nuestro Proceso
        </span>
      </div>
      
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
        <span className="text-crema">Cómo te</span>{" "}
        <span className="text-verde-light">ayudamos</span>
      </h2>
      
      <div className="flex items-center justify-center gap-3">
        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-crema/50" />
        <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-crema/50" />
      </div>
    </div>

        {/* GALERÍA */}
        <div className="flex justify-center gap-3 h-[450px]">
          {pasos.map((paso, index) => (
            <div
              key={index}
              className="
                group
                relative
                w-16
                hover:w-80
                rounded-2xl
                overflow-hidden
                cursor-pointer
                transition-all
                duration-300
                ease-out
              "
            >
              {/* IMAGEN */}
              <img
                src={paso.imagen}
                alt={paso.titulo}
                loading="eager"
                className="
                  absolute 
                  inset-0 
                  w-full 
                  h-full 
                  object-cover
                  group-hover:grayscale
                  transition-all
                  duration-300
                "
              />

              {/* OVERLAY */}
              <div className="
                absolute 
                inset-0 
                bg-gradient-to-t
                from-black/70
                via-black/20
                to-transparent
                opacity-0
                group-hover:opacity-100
                transition-opacity 
                duration-300
              " />

              {/* TEXTO */}
              <div className="
                absolute 
                inset-0 
                flex 
                flex-col 
                justify-end 
                p-6 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-300
              ">
                <h3 className="text-crema text-xl font-semibold mb-2">
                  {paso.titulo}
                </h3>
                <p className="text-crema/90 text-sm leading-relaxed">
                  {paso.texto}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}