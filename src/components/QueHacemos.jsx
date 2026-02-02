import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const items = [
  {
    id: "consumidores",
    titulo: "Usuarios y Consumidores",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkuls6TJymWwxwg13sgJYyEE9PR7O4iWfYRA&s",
    texto: `
Defensa de los derechos de Usuarios y Consumidores.
Recepción de denuncias por infracciones a la Ley 24.240.
Débitos ilícitos, cobros indebidos, incumplimientos de servicios, etc.
    `,
  },
  {
    id: "ambiente",
    titulo: "Medio Ambiente",
    imagen: "https://germinar.org.ar/wp-content/uploads/2020/11/mision-y-vision-germinar-ong.jpg",
    texto: `
Promoción del cuidado ambiental.
Educación y concientización comunitaria.
Denuncias por basurales y cursos de agua contaminados.
    `,
  },
  {
    id: "animales",
    titulo: "Protección de Animales",
    imagen: "https://heraldodemexico.com.mx/u/fotografias/fotosnoticias/2024/11/12/1041139.jpg",
    texto: `
Defensa y protección de los derechos de los animales.
Recepción y acompañamiento de denuncias por maltrato animal.
    `,
  },
];

export default function QueHacemos() {
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  /* ===== TRANSFORMS ===== */
  const scales = items.map((_, i) =>
    useTransform(scrollYProgress, [0, 1], [1, 0.78 - i * 0.05])
  );

  const titleY = items.map((_, i) =>
    useTransform(scrollYProgress, [0.3 + i * 0.1, 0.6 + i * 0.1], [0, -80])
  );

  const titleScale = items.map((_, i) =>
    useTransform(scrollYProgress, [0.3 + i * 0.1, 0.6 + i * 0.1], [1, 0.9])
  );

  const textOpacity = items.map((_, i) =>
    useTransform(scrollYProgress, [0.35 + i * 0.1, 0.65 + i * 0.1], [0, 1])
  );

  const textY = items.map((_, i) =>
    useTransform(scrollYProgress, [0.35 + i * 0.1, 0.65 + i * 0.1], [40, 0])
  );

  const textBlur = items.map((_, i) =>
    useTransform(
      scrollYProgress,
      [0.35 + i * 0.1, 0.65 + i * 0.1],
      ["blur(8px)", "blur(0px)"]
    )
  );

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <section className="hidden lg:block">
        {/* TÍTULO */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-verde mb-4">
            Qué hacemos
          </h2>
          <p className="max-w-3xl mx-auto text-verde/70 text-lg">
            Trabajamos en la defensa de los derechos de usuarios y consumidores,
            la protección del ambiente y el bienestar animal.
          </p>
        </div>

        {/* SCROLL AREA */}
        <section ref={scrollRef} className="relative h-[220vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="flex gap-12 max-w-6xl">

              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  style={{ scale: scales[i] }}
                  className="relative w-[380px] h-[480px] rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* IMAGEN */}
                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* TÍTULO */}
                  <motion.h3
                    style={{
                      y: titleY[i],
                      scale: titleScale[i],
                    }}
                    className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold text-center px-6 pointer-events-none"
                  >
                    {item.titulo}
                  </motion.h3>

                  {/* TEXTO */}
                  <motion.div
                    style={{
                      opacity: textOpacity[i],
                      y: textY[i],
                      filter: textBlur[i],
                    }}
                    className="absolute bottom-0 left-0 right-0 p-6 text-white text-sm leading-relaxed
                               bg-black/60 backdrop-blur-md"
                  >
                    {item.texto}
                  </motion.div>
                </motion.div>
              ))}

            </div>
          </div>
        </section>
      </section>

      {/* ================= MOBILE ================= */}
      <div className="block lg:hidden space-y-16 px-6">
        {items.map(item => (
          <div
            key={item.id}
            className="relative h-[80vh] rounded-2xl overflow-hidden"
          >
            <img
              src={item.imagen}
              className="absolute inset-0 w-full h-full object-cover"
              alt={item.titulo}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-3">{item.titulo}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {item.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
