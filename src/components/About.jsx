import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      num: "01",
      title: "Misión",
      content: "Promover el cuidado del ambiente y la defensa de los derechos de los animales mediante acciones de concientización, asesoramiento y acompañamiento a la comunidad."
    },
    {
      num: "02",
      title: "Visión",
      content: "Construir una sociedad más justa, responsable y respetuosa con el ambiente y los animales."
    },
    {
      num: "03",
      title: "Valores",
      values: ["Compromiso", "Respeto", "Responsabilidad", "Solidaridad", "Transparencia"]
    }
  ];

  return (
    <section id="nosotros" ref={sectionRef} className="relative bg-crema py-24 overflow-hidden">
      
      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="leafPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path 
                d="M25 5 C15 12, 12 22, 25 35 C38 22, 35 12, 25 5" 
                fill="none" 
                stroke="#318223" 
                strokeWidth="0.5"
              />
              <path 
                d="M25 10 L25 30" 
                stroke="#318223" 
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leafPattern)" />
        </svg>
      </div>

      {/* CÍRCULOS DECORATIVOS */}
      <div className="absolute top-20 -left-32 w-64 h-64 bg-verde/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 bg-verde/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER - Igual que QueHacemos */}
        <div 
          className={`text-center mb-16 transition-all duration-1000
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-verde/20 backdrop-blur-sm border border-verde/30 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-verde rounded-full animate-pulse" />
            <span className="text-verde text-sm font-medium tracking-wider uppercase">
              Sobre Nosotros
            </span>
          </div>
          
          {/* Título */}
         <h2 className="text-5xl md:text-7xl font-bold text-verde mb-4 tracking-tight">
                Quiénes <span className="text-verde-light">somos</span>
              </h2>
          
          {/* Línea decorativa con check */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-verde/50" />
            <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-verde/50" />
          </div>
        </div>

        {/* TARJETAS */}
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-sm border border-transparent
                          hover:shadow-xl hover:border-verde/20 hover:-translate-y-2
                          transition-all duration-700 ease-out
                          ${isVisible 
                            ? "opacity-100 translate-y-0" 
                            : "opacity-0 translate-y-20"}`}
              style={{ 
                transitionDelay: isVisible ? `${800 + index * 550}ms` : "10ms"
              }}
            >
              {/* Línea superior animada */}
              <div className="absolute top-0 left-0 w-full h-1 bg-verde rounded-t-2xl scale-x-0 origin-left
                              group-hover:scale-x-100 transition-transform duration-500" />
              
              {/* Número de fondo */}
              <span className="text-verde/10 text-7xl font-black absolute top-2 right-4 
                               group-hover:text-verde/20 group-hover:scale-110 
                               transition-all duration-500 origin-right">
                {card.num}
              </span>
              
              {/* Contenido */}
              <div className="relative pt-4">
                <h3 className="text-2xl font-bold text-verde mb-4">
                  {card.title}
                </h3>
                
                {card.values ? (
                  <div className="space-y-2 text-gray-600">
                    {card.values.map((value, i) => (
                      <div 
                        key={i} 
                        className={`flex items-center gap-3 transition-all duration-500 ease-out
                                    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                        style={{ transitionDelay: isVisible ? `${800 + (index * 250) + (i * 100)}ms` : "0ms" }}
                      >
                        <span className="w-2 h-2 bg-verde/40 rounded-full group-hover:bg-verde group-hover:scale-125 transition-all" />
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {card.content}
                  </p>
                )}
              </div>

              {/* Reflejo sutil en hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-verde/0 to-verde/5 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}