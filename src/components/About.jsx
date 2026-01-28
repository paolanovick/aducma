import { useState, useEffect, useRef } from "react";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
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
      id: 1,
      categoria: "Somos",
      titulo: "Asociación civil sin fines de lucro",
      descripcion: "Trabajamos de manera independiente y transparente por el bienestar animal y ambiental.",
      imagen: "/rescate.jpg",
      color: "from-verde to-verde-dark"
    },
    {
      id: 2,
      categoria: "Misión",
      titulo: "Promover el cuidado del ambiente",
      descripcion: "Concientización, asesoramiento y acompañamiento a la comunidad en temas ambientales y animales.",
      imagen: "/edAmbiental.jpg",
      color: "from-verde-light to-verde"
    },
    {
      id: 3,
      categoria: "Visión",
      titulo: "Una sociedad más justa",
      descripcion: "Construir un futuro responsable y respetuoso con el ambiente y los animales.",
      imagen: "/incendio.jpg",
      color: "from-dorado to-dorado-dark"
    },
    {
      id: 4,
      categoria: "Compromiso",
      titulo: "Compromiso con el ambiente y los animales",
      descripcion: "Cada acción que realizamos está guiada por el respeto a todas las formas de vida.",
      imagen: "/contaminacion.jpg",
      color: "from-verde to-verde-light"
    },
    {
      id: 5,
      categoria: "Compromiso",
      titulo: "Confidencialidad y seriedad",
      descripcion: "Tratamos cada caso con la máxima discreción y profesionalismo.",
      imagen: "/rescate.jpg",
      color: "from-verde-dark to-verde"
    },
    {
      id: 6,
      categoria: "Compromiso",
      titulo: "Acompañamiento responsable",
      descripcion: "Te acompañamos en cada paso del proceso con dedicación y empatía.",
      imagen: "/edAmbiental.jpg",
      color: "from-verde-light to-dorado"
    }
  ];

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    const totalCards = cards.length;
    
    // Calcular posición circular
    let position = diff;
    if (diff > totalCards / 2) position = diff - totalCards;
    if (diff < -totalCards / 2) position = diff + totalCards;

    const isActive = position === 0;
    const isAdjacent = Math.abs(position) === 1;
    const isSecondary = Math.abs(position) === 2;

    return {
      transform: `
        translateX(${position * 280}px) 
        scale(${isActive ? 1 : isAdjacent ? 0.85 : isSecondary ? 0.7 : 0.6})
        rotateY(${position * -15}deg)
      `,
      zIndex: isActive ? 30 : isAdjacent ? 20 : 10,
      opacity: Math.abs(position) > 2 ? 0 : 1,
      filter: isActive ? "none" : "brightness(0.7)"
    };
  };

  return (
    <section id="nosotros" ref={sectionRef} className="relative bg-verde py-24 overflow-hidden">
      
      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-crema/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-verde-light/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crema/10 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div 
          className={`text-center mb-20 transition-all duration-1000
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 bg-crema/20 backdrop-blur-sm border border-crema/30 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-crema rounded-full animate-pulse" />
            <span className="text-crema text-sm font-medium tracking-wider uppercase">
              Sobre Nosotros
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-crema">Quiénes</span>{" "}
            <span className="text-verde-light">somos</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-crema/50" />
            <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-crema/50" />
          </div>
        </div>

        {/* CAROUSEL 3D */}
        <div className="relative h-[500px] flex items-center justify-center perspective-1000">
          
          {/* Cards */}
          <div className="relative w-full flex items-center justify-center">
            {cards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => setActiveIndex(index)}
                className="absolute w-72 h-96 cursor-pointer transition-all duration-500 ease-out"
                style={getCardStyle(index)}
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">
                  {/* Imagen de fondo */}
                  <img
                    src={card.imagen}
                    alt={card.titulo}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-80`} />
                  
                  {/* Contenido */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    {/* Categoría */}
                    <span className="inline-block w-fit bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider mb-3">
                      {card.categoria}
                    </span>
                    
                    {/* Título */}
                    <h3 className="text-xl font-bold mb-2 leading-tight">
                      {card.titulo}
                    </h3>
                    
                    {/* Descripción - solo visible en card activa */}
                    <p className={`text-white/80 text-sm leading-relaxed transition-all duration-300
                                  ${index === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                      {card.descripcion}
                    </p>
                  </div>

                  {/* Borde brillante en hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/30 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INDICADORES */}
        <div className="flex justify-center gap-2 mt-8">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300
                         ${index === activeIndex 
                           ? "w-8 bg-crema" 
                           : "w-2 bg-crema/40 hover:bg-crema/60"}`}
            />
          ))}
        </div>

        {/* NAVEGACIÓN */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)}
            className="w-12 h-12 rounded-full bg-crema/20 border border-crema/30 flex items-center justify-center
                       hover:bg-crema/30 transition-colors group"
          >
            <svg className="w-5 h-5 text-crema group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % cards.length)}
            className="w-12 h-12 rounded-full bg-crema/20 border border-crema/30 flex items-center justify-center
                       hover:bg-crema/30 transition-colors group"
          >
            <svg className="w-5 h-5 text-crema group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}