import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
  }, [queries]);

  return value;
};

export default function Masonry({ items }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:600px)"],
    [4, 3, 2],
    1
  );

  const [grid, setGrid] = useState([]);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth;
    const colHeights = new Array(columns).fill(0);
    const colWidth = width / columns;
    const gap = 16;

    const positioned = items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * colWidth;
      const h = (item.height || 300) / 2;
      const y = colHeights[col];
      colHeights[col] += h + gap;

      return { ...item, x, y, w: colWidth - gap, h };
    });

    setGrid(positioned);
    setHeight(Math.max(...colHeights));
  }, [items, columns]);

  useLayoutEffect(() => {
    grid.forEach((item, i) => {
      gsap.fromTo(
        `[data-key="${item._id}"]`,
        { opacity: 0, y: item.y + 50 },
        {
          opacity: 1,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power3.out",
        }
      );
    });
  }, [grid]);

  const handleClick = (item) => {
    const tipo = item.tipo || "novedad";
    navigate(`/${tipo}/${item._id}`);
  };

  return (
    <div
      ref={containerRef}
      className="masonry-list"
      style={{ height }}
    >
      {grid.map((item) => (
        <div
          key={item._id}
          data-key={item._id}
          className="masonry-item-wrapper group"
          onClick={() => handleClick(item)}
        >
          <div
            className="masonry-item-img"
            style={{ backgroundImage: `url(${item.imagen})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-verde">
            {item.tipo === "curso" ? "📚 Curso" : "📰 Novedad"}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-lg mb-1">{item.titulo}</h3>
            <p className="text-white/70 text-sm">{item.descripcion}</p>
            <p className="text-white/50 text-xs mt-2">{item.fecha}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
