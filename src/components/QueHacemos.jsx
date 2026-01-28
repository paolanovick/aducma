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

  const ejes = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      title: "Bienestar y protección animal",
      description: "Acciones de prevención, asistencia y acompañamiento frente al maltrato y el abandono."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: "Conservación del ambiente",
      description: "Defensa del equilibrio ambiental y promoción de prácticas sostenibles."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      title: "Educación ambiental",
      description: "Generación de espacios de formación y concientización comunitaria."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: "Participación ciudadana",
      description: "Articulación con vecinos, organizaciones y organismos públicos."
    }
  ];

  // VERSIÓN MÓVIL
  if (!isDesktop) {
    return (
      <section className="relative min-h-screen">
        {/* IMAGEN DE FONDO FIJA */}
        <div className="absolute inset-0">
          <img
            src="/tosty.png"
            alt="Protección animal y ambiental"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center bottom", filter: "brightness(0.55)" }}
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
                Nuestra Misión
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-crema mb-4 tracking-tight">
              Qué <span className="text-verde-light">hacemos</span>
            </h2>
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-crema/50" />
              <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-crema/50" />
            </div>
          </div>

          {/* CARD DESCRIPCIÓN */}
          <div className="relative backdrop-blur-xl bg-white/[0.07] border border-white/10 rounded-3xl p-6 sm:p-8 mb-8">
            <div className="absolute top-0 left-0 w-16 h-16">
              <div className="absolute top-4 left-4 w-8 h-[2px] bg-verde/60" />
              <div className="absolute top-4 left-4 w-[2px] h-8 bg-verde/60" />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16">
              <div className="absolute bottom-4 right-4 w-8 h-[2px] bg-verde/60" />
              <div className="absolute bottom-4 right-4 w-[2px] h-8 bg-verde/60" />
            </div>
            
            <div className="relative space-y-4 text-crema/90 text-base leading-relaxed">
              <p>
                Trabajamos por la <span className="text-verde-light font-semibold">defensa y protección</span> de 
                los derechos de los animales, interviniendo ante situaciones de maltrato, abandono 
                y vulneración del bienestar animal.
              </p>
              <p>
                Recibimos y acompañamos <span className="text-verde-light font-semibold">denuncias</span> vinculadas 
                al daño ambiental, brindando orientación responsable y seguimiento de cada caso.
              </p>
              <p>
                Promovemos la <span className="text-verde-light font-semibold">educación ambiental</span> y la 
                concientización ciudadana como herramientas fundamentales para construir una sociedad 
                más justa con todas las formas de vida.
              </p>
            </div>
          </div>

          {/* EJES DE TRABAJO */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-crema/40" />
              <h3 className="text-xl font-bold text-crema">Nuestros ejes de trabajo</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ejes.map((eje, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/[0.05] border border-white/10 rounded-2xl p-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-verde/20 border border-verde/30 flex items-center justify-center mb-3 text-verde-light">
                    {eje.icon}
                  </div>
                  <h4 className="text-crema font-bold text-base mb-2">{eje.title}</h4>
                  <p className="text-crema/60 text-sm leading-relaxed">{eje.description}</p>
                </div>
              ))}
            </div>
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
            filter: `brightness(${0.55 - scrollY * 0.1})`,
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-verde/30 via-transparent to-black/60" />
        
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* CONTENIDO PRINCIPAL DESKTOP */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="sticky top-0 h-screen flex items-center pointer-events-auto">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
            
            {/* HEADER */}
            <div 
              className="text-center mb-16 transition-all duration-700 ease-out"
              style={{ 
                opacity: Math.min(scrollY * 4, 1),
                transform: `translateY(${Math.max(60 - scrollY * 200, 0)}px)`
              }}
            >
              <div className="inline-flex items-center gap-2 bg-verde/20 backdrop-blur-sm border border-verde/30 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-verde rounded-full animate-pulse" />
                <span className="text-crema/80 text-sm font-medium tracking-wider uppercase">
                  Nuestra Misión
                </span>
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-bold text-crema mb-4 tracking-tight">
                Qué <span className="text-verde-light">hacemos</span>
              </h2>
              
              <div className="flex items-center justify-center gap-3">
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-crema/50" />
                <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-crema/50" />
              </div>
            </div>

            {/* GRID PRINCIPAL */}
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              
              {/* COLUMNA IZQUIERDA */}
              <div 
                className="lg:col-span-2 transition-all duration-700 ease-out"
                style={{
                  opacity: Math.min(Math.max((scrollY - 0.08) * 5, 0), 1),
                  transform: `translateX(${Math.max(-80 + scrollY * 400, 0)}px)`,
                }}
              >
                <div className="relative group">
                  <div className="relative backdrop-blur-xl bg-white/[0.07] border border-white/10 rounded-3xl p-8 overflow-hidden
                                  hover:bg-white/[0.1] hover:border-white/20 transition-all duration-500">
                    
                    <div className="absolute top-0 left-0 w-20 h-20">
                      <div className="absolute top-4 left-4 w-12 h-[2px] bg-verde/60" />
                      <div className="absolute top-4 left-4 w-[2px] h-12 bg-verde/60" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20">
                      <div className="absolute bottom-4 right-4 w-12 h-[2px] bg-verde/60" />
                      <div className="absolute bottom-4 right-4 w-[2px] h-12 bg-verde/60" />
                    </div>
                    
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-verde/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative space-y-5">
                      <p className="text-crema/90 text-lg leading-relaxed">
                        Trabajamos por la <span className="text-verde-light font-semibold">defensa y protección</span> de 
                        los derechos de los animales, interviniendo ante situaciones de maltrato, abandono 
                        y vulneración del bienestar animal.
                      </p>
                      <p className="text-crema/80 text-lg leading-relaxed">
                        Recibimos y acompañamos <span className="text-verde-light font-semibold">denuncias</span> vinculadas 
                        al daño ambiental, brindando orientación responsable y seguimiento de cada caso.
                      </p>
                      <p className="text-crema/80 text-lg leading-relaxed">
                        Promovemos la <span className="text-verde-light font-semibold">educación ambiental</span> y la 
                        concientización ciudadana como herramientas fundamentales para construir una sociedad 
                        más justa con todas las formas de vida.
                      </p>
                      
                      <a 
                        href="#contacto"
                        className="inline-flex items-center gap-2 mt-4 text-verde-light hover:text-white transition-colors group/btn"
                      >
                        <span className="font-semibold">Conocé más</span>
                        <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA */}
              <div 
                className="lg:col-span-3 transition-all duration-700 ease-out"
                style={{
                  opacity: Math.min(Math.max((scrollY - 0.15) * 5, 0), 1),
                  transform: `translateX(${Math.min(80 - scrollY * 400, 0)}px)`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[2px] w-8 bg-crema/40" />
                  <h3 className="text-2xl font-bold text-crema">Nuestros ejes de trabajo</h3>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {ejes.map((eje, index) => (
                    <div
                      key={index}
                      className="group relative backdrop-blur-md bg-white/[0.05] border border-white/10 rounded-2xl p-6
                                 hover:bg-verde/20 hover:border-verde/40 hover:scale-[1.02]
                                 transition-all duration-400 cursor-default"
                      style={{ transitionDelay: `${index * 75}ms` }}
                    >
                      <div className="w-14 h-14 rounded-xl bg-verde/20 border border-verde/30 flex items-center justify-center mb-4
                                      text-verde-light group-hover:bg-verde/40 group-hover:scale-110 group-hover:rotate-3
                                      transition-all duration-400">
                        {eje.icon}
                      </div>
                      
                      <h4 className="text-crema font-bold text-lg mb-2 group-hover:text-white transition-colors">
                        {eje.title}
                      </h4>
                      
                      <p className="text-crema/60 text-sm leading-relaxed group-hover:text-crema/80 transition-colors">
                        {eje.description}
                      </p>
                      
                      <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-verde/0 via-verde/50 to-verde/0 
                                      scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                  ))}
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