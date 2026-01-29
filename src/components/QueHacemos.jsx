import { useEffect, useRef, useState } from "react";

export default function QueHacemos() {
  const [scrollY, setScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isDesktop) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(sectionTop / sectionHeight, 0), 1);
      setScrollY(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const queHacemos = [
    "Defensa de los derechos de Usuarios y Consumidores",
    "Recepción de denuncias de los Usuarios y Consumidores por infracciones a la ley 24.240",
    "Defensa y protección de los derechos de los animales",
    "Recepción y acompañamiento de denuncias por maltrato animal",
    "Promoción del cuidado ambiental",
    "Educación y concientización comunitaria",
    "Articulación con organismos públicos y privados",
    "Acompañamiento ciudadano en casos de defensa de derechos, ambientales y de bienestar animal"
  ];

  const ejes = [
    "Promoción de las buenas prácticas comerciales para con los Usuarios y Consumidores",
    "Recepción de denuncias por infracciones a la Ley 24.240",
    "Articulaciones con entidades públicas y privadas con el fin de ajustar políticas de prevención de infracciones a la Ley 24.240",
    "Audiencias de conciliación entre usuarios/consumidores con proveedores infractores",
    "Bienestar y protección animal",
    "Conservación del ambiente",
    "Prevención del maltrato y abandono"
  ];

  // VERSIÓN MÓVIL
  if (!isDesktop) {
    return (
      <section className="relative min-h-screen">
        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0">
          <img
            src="/tosty.png"
            alt="Protección animal y ambiental"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center bottom", filter: "brightness(0.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-verde/30 via-transparent to-black/60" />
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 px-4 sm:px-6 py-16">
          
          {/* HEADER */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-verde/20 backdrop-blur-sm border border-verde/30 rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 bg-verde rounded-full animate-pulse" />
              <span className="text-crema/80 text-sm font-medium tracking-wider uppercase">
                Nuestra Labor
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-crema mb-4 tracking-tight">
              Nuestra <span className="text-verde-light">misión</span>
            </h2>
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-crema/50" />
              <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-crema/50" />
            </div>
          </div>

          {/* CARD QUÉ HACEMOS */}
          <div className="relative backdrop-blur-xl bg-white/[0.07] border border-white/10 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-6 bg-crema/40" />
              <h3 className="text-xl font-bold text-crema">Qué hacemos</h3>
            </div>
            
            <ul className="space-y-3">
              {queHacemos.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-verde-light rounded-full mt-2 flex-shrink-0" />
                  <span className="text-crema/80 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CARD EJES DE TRABAJO */}
          <div className="relative backdrop-blur-xl bg-white/[0.07] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-6 bg-crema/40" />
              <h3 className="text-xl font-bold text-crema">Nuestros ejes de trabajo</h3>
            </div>
            
            <ul className="space-y-3">
              {ejes.map((eje, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-verde-light rounded-full mt-2 flex-shrink-0" />
                  <span className="text-crema/80 text-sm leading-relaxed">{eje}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  // VERSIÓN DESKTOP CON PARALLAX
  return (
    <section ref={sectionRef} className="relative h-[280vh]">
      
      {/* IMAGEN DE FONDO CON PARALLAX */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          src="/tosty.png"
          alt="Protección animal y ambiental"
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{
            objectPosition: "center bottom",
            transform: `scale(${1 + scrollY * 0.15})`,
            filter: `brightness(${0.5 - scrollY * 0.1})`,
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-verde/30 via-transparent to-black/60" />
      </div>

      {/* CONTENIDO PRINCIPAL DESKTOP */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="sticky top-0 h-screen flex items-center pointer-events-auto">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
            
            {/* HEADER */}
            <div 
              className="text-center mb-12 transition-all duration-700 ease-out"
              style={{ 
                opacity: Math.min(scrollY * 4, 1),
                transform: `translateY(${Math.max(60 - scrollY * 200, 0)}px)`
              }}
            >
              <div className="inline-flex items-center gap-2 bg-verde/20 backdrop-blur-sm border border-verde/30 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-verde rounded-full animate-pulse" />
                <span className="text-crema/80 text-sm font-medium tracking-wider uppercase">
                  Nuestra Labor
                </span>
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-bold text-crema mb-4 tracking-tight">
                Nuestra <span className="text-verde-light">misión</span>
              </h2>
              
              <div className="flex items-center justify-center gap-3">
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-crema/50" />
                <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-crema/50" />
              </div>
            </div>
            {/* MISIÓN · VISIÓN · VALORES */}
<div
  className="grid md:grid-cols-3 gap-6 mb-16 transition-all duration-700 ease-out"
  style={{
    opacity: Math.min(Math.max((scrollY - 0.04) * 6, 0), 1),
    transform: `translateY(${Math.max(40 - scrollY * 200, 0)}px)`
  }}
>
  {/* MISIÓN */}
  <div className="backdrop-blur-xl bg-white/[0.07] border border-white/10 rounded-2xl p-6
                  hover:bg-white/[0.1] hover:border-white/20 transition-all duration-500">
    <h3 className="text-lg font-bold text-crema mb-3">Misión</h3>
    <p className="text-crema/80 text-sm leading-relaxed">
      Promover la defensa de los derechos de usuarios y consumidores, el cuidado
      del ambiente y la defensa de los derechos de los animales mediante acciones
      de concientización, asesoramiento y acompañamiento a la comunidad.
    </p>
  </div>

  {/* VISIÓN */}
  <div className="backdrop-blur-xl bg-white/[0.07] border border-white/10 rounded-2xl p-6
                  hover:bg-white/[0.1] hover:border-white/20 transition-all duration-500">
    <h3 className="text-lg font-bold text-crema mb-3">Visión</h3>
    <p className="text-crema/80 text-sm leading-relaxed">
      Construir una sociedad más justa, responsable y respetuosa con el ambiente,
      los animales y los consumidores, promoviendo el trato digno y el deber de
      informar correctamente previo a la contratación de productos o servicios.
    </p>
  </div>

  {/* VALORES */}
  <div className="backdrop-blur-xl bg-white/[0.07] border border-white/10 rounded-2xl p-6
                  hover:bg-white/[0.1] hover:border-white/20 transition-all duration-500">
    <h3 className="text-lg font-bold text-crema mb-3">Valores</h3>
    <ul className="flex flex-wrap gap-2">
      {["Compromiso", "Respeto", "Responsabilidad", "Solidaridad", "Transparencia"].map(
        (valor, i) => (
          <li
            key={i}
            className="px-3 py-1 rounded-full text-xs font-medium
                       bg-verde/20 text-crema border border-verde/30"
          >
            {valor}
          </li>
        )
      )}
    </ul>
  </div>
</div>


            {/* DOS COLUMNAS */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
              
              {/* COLUMNA IZQUIERDA - Qué hacemos */}
              <div 
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: Math.min(Math.max((scrollY - 0.08) * 5, 0), 1),
                  transform: `translateX(${Math.max(-80 + scrollY * 400, 0)}px)`,
                }}
              >
                <div className="relative group h-full">
                  <div className="relative backdrop-blur-xl bg-white/[0.07] border border-white/10 rounded-2xl p-5 lg:p-6 overflow-hidden h-full
                                  hover:bg-white/[0.1] hover:border-white/20 transition-all duration-500">
                    
                    {/* Esquinas decorativas */}
                    <div className="absolute top-0 left-0 w-16 h-16">
                      <div className="absolute top-3 left-3 w-8 h-[2px] bg-verde/60" />
                      <div className="absolute top-3 left-3 w-[2px] h-8 bg-verde/60" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16">
                      <div className="absolute bottom-3 right-3 w-8 h-[2px] bg-verde/60" />
                      <div className="absolute bottom-3 right-3 w-[2px] h-8 bg-verde/60" />
                    </div>

                    {/* Título */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-[2px] w-6 bg-crema/40" />
                      <h3 className="text-xl font-bold text-crema">Qué hacemos</h3>
                    </div>
                    
                    {/* Lista */}
                    <ul className="relative space-y-3">
                      {queHacemos.map((item, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-2 group/item"
                        >
                          <span className="w-1.5 h-1.5 bg-verde-light rounded-full mt-2 flex-shrink-0" />
                          <span className="text-crema/80 text-sm leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA - Ejes de trabajo */}
              <div 
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: Math.min(Math.max((scrollY - 0.15) * 5, 0), 1),
                  transform: `translateX(${Math.min(80 - scrollY * 400, 0)}px)`,
                }}
              >
                <div className="relative group h-full">
                  <div className="relative backdrop-blur-xl bg-white/[0.07] border border-white/10 rounded-2xl p-5 lg:p-6 overflow-hidden h-full
                                  hover:bg-white/[0.1] hover:border-white/20 transition-all duration-500">
                    
                    {/* Esquinas decorativas */}
                    <div className="absolute top-0 left-0 w-16 h-16">
                      <div className="absolute top-3 left-3 w-8 h-[2px] bg-verde/60" />
                      <div className="absolute top-3 left-3 w-[2px] h-8 bg-verde/60" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16">
                      <div className="absolute bottom-3 right-3 w-8 h-[2px] bg-verde/60" />
                      <div className="absolute bottom-3 right-3 w-[2px] h-8 bg-verde/60" />
                    </div>

                    {/* Título */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-[2px] w-6 bg-crema/40" />
                      <h3 className="text-xl font-bold text-crema">Nuestros ejes de trabajo</h3>
                    </div>
                    
                    {/* Lista */}
                    <ul className="relative space-y-3">
                      {ejes.map((eje, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-2 group/item"
                        >
                          <span className="w-1.5 h-1.5 bg-verde-light rounded-full mt-2 flex-shrink-0" />
                          <span className="text-crema/80 text-sm leading-relaxed">
                            {eje}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* SCROLL INDICATOR */}
            <div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ opacity: Math.max(1 - scrollY * 4, 0) }}
            >
              <span className="text-crema/40 text-xs uppercase tracking-[0.2em]">Scroll</span>
              <div className="w-6 h-10 border-2 border-crema/30 rounded-full flex justify-center pt-2">
                <div className="w-1.5 h-3 bg-crema/50 rounded-full animate-bounce" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}