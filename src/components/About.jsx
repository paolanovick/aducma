// About.jsx - NOSOTROS con carrusel reveal
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tarjetas = [
    {
      id: "mision",
      titulo: "Misión",
      imagen: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800",
      contenido: "Promover la defensa de los derechos de usuarios y consumidores, el cuidado del ambiente y la defensa de los derechos de los animales mediante acciones de concientización, asesoramiento y acompañamiento a la comunidad.",
    },
    {
      id: "vision",
      titulo: "Visión",
      imagen: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      contenido: "Construir una sociedad más justa, responsable y respetuosa con el ambiente, los animales y los consumidores, promoviendo el trato digno y el deber de informar correctamente previo a la contratación de productos o servicios.",
    },
    {
      id: "valores",
      titulo: "Valores",
      imagen: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
      contenido: "Compromiso – Respeto – Responsabilidad – Solidaridad – Transparencia",
    },
  ];

  return (
    <section id="nosotros" className="bg-verde py-20 scroll-mt-24 overflow-hidden">
      {/* TÍTULO Y TEXTO */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-6">
          NOSOTROS
        </h2>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/90 text-lg leading-relaxed mb-4">
            Somos una Asociación Civil sin fines de lucro comprometida con la defensa de los derechos de Usuarios y Consumidores, la protección del ambiente y la defensa de los derechos de los animales.
          </p>
          <p className="text-white/80 leading-relaxed">
            Actuamos con responsabilidad social, compromiso ciudadano y respeto por la normativa vigente.
          </p>
        </div>
      </div>

      {/* CARRUSEL */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={1.5}
        centeredSlides={true}
        spaceBetween={20}
        loop={true}
        loopAdditionalSlides={3}
        navigation={{
          prevEl: ".about-prev",
          nextEl: ".about-next",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2.5, spaceBetween: 25 },
          1024: { slidesPerView: 3.5, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
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
                    ? "0 30px 60px rgba(0,0,0,0.35)"
                    : "0 10px 20px rgba(0,0,0,0.1)",
                  opacity: isActive ? 1 : 0.6,
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

      {/* CONTROLES */}
      <div className="flex items-center justify-center gap-6 mt-4 pb-4">
        <button className="about-prev w-12 h-12 rounded-full border-2 border-white/50 hover:bg-white hover:text-verde text-white transition-all flex items-center justify-center">
          <span className="text-xl">←</span>
        </button>

        <div className="text-white font-medium">
          {activeIndex + 1} / {tarjetas.length}
        </div>

        <button className="about-next w-12 h-12 rounded-full border-2 border-white/50 hover:bg-white hover:text-verde text-white transition-all flex items-center justify-center">
          <span className="text-xl">→</span>
        </button>
      </div>
    </section>
  );
}