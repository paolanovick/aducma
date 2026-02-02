import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    id: "consumidores",
    titulo: "Usuarios y Consumidores",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkuls6TJymWwxwg13sgJYyEE9PR7O4iWfYRA&s",
    icono: "🛡️",
    color: "from-emerald-600 to-teal-700",
    colorLight: "bg-emerald-500",
    texto: [
      "Defensa de los derechos de Usuarios y Consumidores.",
      "Recepción de denuncias por infracciones a la Ley 24.240.",
      "Débitos ilícitos, cobros indebidos, incumplimientos de servicios, etc.",
    ],
  },
  {
    id: "ambiente",
    titulo: "Medio Ambiente",
    imagen:
      "https://germinar.org.ar/wp-content/uploads/2020/11/mision-y-vision-germinar-ong.jpg",
    icono: "🌿",
    color: "from-green-600 to-emerald-700",
    colorLight: "bg-green-500",
    texto: [
      "Promoción del cuidado ambiental.",
      "Educación y concientización comunitaria.",
      "Denuncias por basurales y cursos de agua contaminados.",
    ],
  },
  {
    id: "animales",
    titulo: "Protección de Animales",
    imagen:
      "https://heraldodemexico.com.mx/u/fotografias/fotosnoticias/2024/11/12/1041139.jpg",
    icono: "🐾",
    color: "from-teal-600 to-cyan-700",
    colorLight: "bg-teal-500",
    texto: [
      "Defensa y protección de los derechos de los animales.",
      "Recepción y acompañamiento de denuncias por maltrato animal.",
    ],
  },
];

export default function QueHacemos() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  const goNext = () => setSelectedIndex((prev) => (prev + 1) % items.length);
  const goPrev = () => setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section id="que-hacemos" className="py-24 px-6 lg:px-12 bg-verde scroll-mt-24">
      {/* TÍTULO - FONDO VERDE, LETRAS BLANCAS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center mb-20"
      >
        <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
          Nuestro trabajo
        </span>
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
          Qué hacemos
        </h2>
        <p className="max-w-2xl mx-auto text-white/80 text-lg lg:text-xl">
          Trabajamos en la defensa de los derechos de usuarios y consumidores,
          la protección del ambiente y el bienestar animal.
        </p>
      </motion.div>

      {/* TARJETAS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            onClick={() => setSelectedIndex(index)}
            className="group relative h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl cursor-pointer bg-white"
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Imagen */}
            <img
              src={item.imagen}
              alt={item.titulo}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay con gradiente */}
            <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60 
                            mix-blend-multiply transition-opacity duration-300 group-hover:opacity-70`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Icono */}
            <motion.div
              className="absolute top-6 right-6 text-4xl"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 15, scale: 1.2 }}
            >
              {item.icono}
            </motion.div>

            {/* Contenido */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-3 
                           transition-transform duration-300 group-hover:-translate-y-2">
                {item.titulo}
              </h3>
              
              <div className="flex items-center gap-2 text-white/80 text-sm 
                            transition-all duration-300 group-hover:text-white">
                <span>Ver más información</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </div>
            </div>

            {/* Borde brillante en hover */}
            <div className="absolute inset-0 rounded-3xl border-2 border-white/0 
                          group-hover:border-white/30 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence mode="wait">
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedIndex(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
            />

            {/* Navegación - Flecha izquierda */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 
                       w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md
                       flex items-center justify-center text-white 
                       hover:bg-white/20 hover:scale-110 transition-all duration-200"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Navegación - Flecha derecha */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 
                       w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md
                       flex items-center justify-center text-white 
                       hover:bg-white/20 hover:scale-110 transition-all duration-200"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Indicadores de posición */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2"
            >
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                            ${idx === selectedIndex 
                              ? "bg-white w-8" 
                              : "bg-white/40 hover:bg-white/60"}`}
                />
              ))}
            </motion.div>

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
              >
                {/* Imagen del modal */}
                <div className="relative h-56 md:h-72 lg:h-80 overflow-hidden">
                  <motion.img
                    key={`img-${selected.id}`}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={selected.imagen}
                    alt={selected.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${selected.color} opacity-50 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Icono grande */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="absolute top-6 left-6 text-5xl"
                  >
                    {selected.icono}
                  </motion.div>

                  {/* Título sobre la imagen */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <motion.h3
                      key={`title-${selected.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-white text-3xl md:text-4xl lg:text-5xl font-bold"
                    >
                      {selected.titulo}
                    </motion.h3>
                  </div>

                  {/* Botón cerrar */}
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/30 backdrop-blur-md 
                             flex items-center justify-center text-white 
                             hover:bg-black/50 hover:rotate-90 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Contenido del modal */}
                <div className="p-6 md:p-8 lg:p-10">
                  <ul className="space-y-4 mb-8">
                    {selected.texto.map((linea, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex items-start gap-4 text-gray-700 text-lg lg:text-xl"
                      >
                        <span className={`mt-2 w-3 h-3 rounded-full ${selected.colorLight} flex-shrink-0 
                                       shadow-lg shadow-green-500/30`} />
                        {linea}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Botones de acción */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <a
                      href="#denuncia"
                      onClick={() => setSelectedIndex(null)}
                      className={`flex-1 py-4 px-6 bg-gradient-to-r ${selected.color} text-white 
                               font-semibold rounded-xl text-center text-lg
                               hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-1
                               transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                      Hacer una denuncia
                    </a>
                    
                    <a
                      href="#contacto"
                      onClick={() => setSelectedIndex(null)}
                      className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 
                               font-semibold rounded-xl text-center text-lg
                               hover:bg-gray-200 hover:-translate-y-1
                               transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Contactar
                    </a>
                  </motion.div>

                  {/* Hint de navegación */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-gray-400 text-sm mt-6"
                  >
                    Usá las flechas ← → o los indicadores para navegar
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}