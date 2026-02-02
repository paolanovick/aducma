// About.jsx - NOSOTROS con fondo claro y letras verdes
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useRef, useEffect, useCallback } from "react";

import "swiper/css";
import "swiper/css/navigation";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const swiperRef = useRef(null);

  const tarjetas = [
    {
      id: "mision",
      titulo: "Misión",
      imagen: "/mision.png",
      contenido: "Promover la defensa de los derechos de usuarios y consumidores, el cuidado del ambiente y la defensa de los derechos de los animales mediante acciones de concientización, asesoramiento y acompañamiento a la comunidad.",
    },
    {
      id: "vision",
      titulo: "Visión",
      imagen: "/vision.png",
      contenido: "Construir una sociedad más justa, responsable y respetuosa con el ambiente, los animales y los consumidores, promoviendo el trato digno y el deber de informar correctamente previo a la contratación de productos o servicios.",
    },
    {
      id: "valores",
      titulo: "Valores",
      imagen: "/valores.png",
      contenido: "Compromiso – Respeto – Responsabilidad – Solidaridad – Transparencia",
    },
  ];

  // Función para inicializar el swiper correctamente
  const initializeSwiper = useCallback((swiper) => {
    swiperRef.current = swiper;
    
    // Forzar la actualización después de un pequeño delay
    requestAnimationFrame(() => {
      if (swiper && !swiper.destroyed) {
        swiper.update();
        swiper.slideTo(0, 0);
        setActiveIndex(0);
        
        // Segundo update para asegurar el centrado
        setTimeout(() => {
          if (swiper && !swiper.destroyed) {
            swiper.update();
            setIsReady(true);
          }
        }, 50);
      }
    });
  }, []);

  // Re-centrar en resize
  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.update();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="nosotros" className="bg-gradient-to-b from-white via-green-50/30 to-white py-20 scroll-mt-24 overflow-hidden">
      {/* TÍTULO Y TEXTO - FONDO CLARO, LETRAS VERDES */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-verde text-center mb-6">
          NOSOTROS
        </h2>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-verde/90 text-lg leading-relaxed mb-4">
            Somos una Asociación Civil sin fines de lucro comprometida con la defensa de los derechos de Usuarios y Consumidores, la protección del ambiente y la defensa de los derechos de los animales.
          </p>
          <p className="text-verde/70 leading-relaxed">
            Actuamos con responsabilidad social, compromiso ciudadano y respeto por la normativa vigente.
          </p>
        </div>
      </div>

      {/* CARRUSEL */}
      <div 
        className="transition-opacity duration-500"
        style={{ opacity: isReady ? 1 : 0 }}
      >
        <Swiper
          modules={[Navigation]}
          onSwiper={initializeSwiper}
          slidesPerView={1.2}
          centeredSlides={true}
          spaceBetween={20}
          loop={false}
          initialSlide={0}
          watchSlidesProgress={true}
          navigation={{
            prevEl: ".about-prev",
            nextEl: ".about-next",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {tarjetas.map((tarjeta, index) => {
            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={tarjeta.id}>
                <div
                  className="relative h-[450px] sm:h-[480px] bg-white rounded-2xl overflow-hidden mb-16"
                  style={{
                    transform: isActive
                      ? "perspective(1000px) rotateX(2deg) scale(1.05) translateY(-16px)"
                      : "perspective(1000px) rotateX(0deg) scale(0.9)",
                    boxShadow: isActive
                      ? "0 30px 60px rgba(0,0,0,0.25)"
                      : "0 10px 20px rgba(0,0,0,0.08)",
                    opacity: isActive ? 1 : 0.5,
                    zIndex: isActive ? 20 : 10,
                    transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* IMAGEN */}
                  <div
                    className="absolute top-0 left-0 right-0 overflow-hidden transition-all duration-700 ease-in-out"
                    style={{
                      height: isActive ? "200px" : "410px",
                    }}
                  >
                    <img
                      src={tarjeta.imagen}
                      alt={tarjeta.titulo}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* CONTENIDO */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-white flex flex-col items-center text-center transition-all duration-700 ease-in-out"
                    style={{
                      height: isActive ? "280px" : "70px",
                      justifyContent: isActive ? "flex-start" : "center",
                      paddingTop: isActive ? "24px" : "0",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    <h3
                      className="font-bold text-verde uppercase tracking-wider transition-all duration-700"
                      style={{
                        fontSize: isActive ? "1.5rem" : "1.25rem",
                        marginBottom: isActive ? "12px" : "0",
                      }}
                    >
                      {tarjeta.titulo}
                    </h3>

                    {isActive && (
                      <>
                        <div className="w-12 h-1 bg-verde-light mb-4"></div>
                        <p className="text-verde/70 text-sm sm:text-base leading-relaxed max-w-sm">
                          {tarjeta.contenido}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* CONTROLES - Colores invertidos para fondo claro */}
      <div className="flex items-center justify-center gap-6 mt-4 pb-4">
        <button className="about-prev w-12 h-12 rounded-full border-2 border-verde/50 hover:bg-verde hover:text-white text-verde transition-all flex items-center justify-center">
          <span className="text-xl">←</span>
        </button>

        <div className="text-verde font-medium">
          {activeIndex + 1} / {tarjetas.length}
        </div>

        <button className="about-next w-12 h-12 rounded-full border-2 border-verde/50 hover:bg-verde hover:text-white text-verde transition-all flex items-center justify-center">
          <span className="text-xl">→</span>
        </button>
      </div>
    </section>
  );
}