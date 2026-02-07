import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DesktopScrollReveal({ items }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // animaciones sincronizadas
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.4, 0.8], [40, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="flex gap-10 max-w-6xl">
          {items.map((item) => (
            <motion.div
              key={item.id}
              style={{ scale }}
              className="relative w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* imagen */}
              <img
                src={item.imagen}
                alt={item.titulo}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* titulo centrado */}
              <h3 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                {item.titulo}
              </h3>

              {/* texto reveal */}
              <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="absolute bottom-0 p-5 text-white"
              >
                <p className="text-sm leading-relaxed">
                  {item.contenido}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
