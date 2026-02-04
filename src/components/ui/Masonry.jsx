import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "./Masonry.css";

const useMedia = (queries, values, defaultValue) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get());
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) => matchMedia(q).removeEventListener("change", handler));
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = resolve;
        })
    )
  );
};

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
}) {
  const navigate = useNavigate();
  
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:600px)"],
    [4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    preloadImages(items.map((i) => i.imagen)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, containerHeight } = useMemo(() => {
  if (!width) return { grid: [], containerHeight: 400 };
  const colHeights = new Array(columns).fill(0);
  const colWidth = width / columns;
  const gap = 16;

  const gridItems = items.map((item) => {
    const col = colHeights.indexOf(Math.min(...colHeights));
    const x = col * colWidth;
    const h = (item.height || 300) / 2;
    const y = colHeights[col];
    colHeights[col] += h + gap;
    return { ...item, x, y, w: colWidth - gap, h };
  });

  const maxHeight = Math.max(...colHeights);
  
  return { grid: gridItems, containerHeight: maxHeight };
  }, [columns, items, width]);
  

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, i) => {
      gsap.fromTo(
        `[data-key="${item._id}"]`,
        {
          opacity: 0,
          y: animateFrom === "bottom" ? item.y + 100 : item.y,
          filter: blurToFocus ? "blur(10px)" : "none",
        },
        {
          opacity: 1,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          filter: "blur(0px)",
          duration: 0.8,
          delay: i * stagger,
          ease,
        }
      );
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, ease]);

  const handleClick = (item) => {
    const tipo = item.tipo || "novedad";
    navigate(`/${tipo}/${item._id}`);
  };

return (
  <div 
    ref={containerRef} 
    className="masonry-list"
    style={{ height: containerHeight }}
  >
          {/* Imagen de fondo */}
          <div
            className="masonry-item-img"
            style={{ backgroundImage: `url(${item.imagen})` }}
          />
          
          {/* Overlay con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                          group-hover:from-black/95 transition-all duration-300" />
          
          {/* Etiqueta tipo */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
            ${item.tipo === 'curso' 
              ? 'bg-verde text-white' 
              : 'bg-dorado text-white'
            }`}
          >
            {item.tipo === 'curso' ? '📚 Curso' : '📰 Novedad'}
          </div>

          {/* Contenido */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-verde-light transition-colors">
              {item.titulo}
            </h3>
            <p className="text-white/70 text-sm line-clamp-2">
              {item.descripcion}
            </p>
            
            {/* Fecha */}
            <p className="text-white/50 text-xs mt-2">
              {item.fecha}
            </p>

            {/* Botón ver más (aparece en hover) */}
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-1 text-verde-light text-sm font-medium">
                Ver más 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}