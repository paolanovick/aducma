import { useEffect, useRef, useState } from "react";
import { AngledSlider } from "../components/ui/AngledSlider";

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

  const items = [
    {
      id: 1,
      categoria: "Somos",
      titulo: "Asociación civil sin fines de lucro",
      descripcion: "Trabajamos de manera independiente y transparente.",
      imagen: "/rescate.jpg",
    },
    {
      id: 2,
      categoria: "Misión",
      titulo: "Promover el cuidado del ambiente",
      descripcion: "Concientización y acompañamiento a la comunidad.",
      imagen: "/edAmbiental.jpg",
    },
    {
      id: 3,
      categoria: "Visión",
      titulo: "Una sociedad más justa",
      descripcion: "Futuro responsable con el ambiente y los animales.",
      imagen: "/incendio.jpg",
    },
    {
      id: 4,
      categoria: "Compromiso",
      titulo: "Compromiso con el ambiente",
      descripcion: "Respeto a todas las formas de vida.",
      imagen: "/contaminacion.jpg",
    },
    {
      id: 5,
      categoria: "Compromiso",
      titulo: "Confidencialidad y seriedad",
      descripcion: "Máxima discreción y profesionalismo.",
      imagen: "/rescate.jpg",
    },
    {
      id: 6,
      categoria: "Compromiso",
      titulo: "Acompañamiento responsable",
      descripcion: "Te acompañamos con dedicación y empatía.",
      imagen: "/edAmbiental.jpg",
    },
  ];

  return (
    <section id="nosotros" ref={sectionRef} className="relative bg-crema py-24 overflow-hidden">
      
      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-verde/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-verde-light/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">

        {/* HEADER */}
        <div 
          className={`text-center mb-12 px-6 transition-all duration-1000
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 bg-verde/20 backdrop-blur-sm border border-verde/30 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-verde rounded-full animate-pulse" />
            <span className="text-verde text-sm font-medium tracking-wider uppercase">
              Sobre Nosotros
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-verde">Quiénes</span>{" "}
            <span className="text-verde-light">somos</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-verde/50" />
            <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-verde/50" />
          </div>
        </div>

        {/* ANGLED SLIDER */}
        <AngledSlider 
          items={items} 
          speed={35}
          containerHeight="420px"
          cardWidth="280px"
          gap="30px"
          angle={18}
          hoverScale={1.08}
        />

      </div>
    </section>
  );
}