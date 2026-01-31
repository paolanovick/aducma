import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const carteles = [
    {
      id: "novedades",
      titulo: "Novedades",
      descripcion: "Gestionar noticias y eventos",
      icono: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: "bg-amber-100",
      pinColor: "bg-red-500",
      ruta: "/dashboard/novedades",
      rotacion: "-rotate-2",
    },
    {
      id: "cursos",
      titulo: "Cursos",
      descripcion: "Gestionar cursos y talleres",
      icono: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "bg-green-100",
      pinColor: "bg-blue-500",
      ruta: "/dashboard/cursos",
      rotacion: "rotate-1",
    },
  ];

  return (
    <div className="min-h-screen bg-crema">
      {/* HEADER */}
      <header className="bg-verde text-white py-4 px-6 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">ADUCMA</h1>
            <span className="text-crema/60">|</span>
            <span className="text-crema/80">Panel de Administración</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-crema/70 hover:text-crema text-sm">
              Ver sitio →
            </a>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* PIZARRA DE CORCHO */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-verde mb-2">¡Bienvenido!</h2>
          <p className="text-verde/60">Seleccioná una sección para administrar</p>
        </div>

        {/* PIZARRA */}
        <div 
          className="relative rounded-3xl p-8 sm:p-12 min-h-[500px]"
          style={{
            backgroundColor: "#c4956a",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundBlendMode: "overlay",
            boxShadow: "inset 0 0 50px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          {/* Marco de madera */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: "12px solid #8B4513",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
            }}
          />

          {/* CARTELES */}
          <div className="relative z-10 flex flex-wrap justify-center gap-8 sm:gap-12">
            {carteles.map((cartel) => (
              <div
                key={cartel.id}
                onClick={() => navigate(cartel.ruta)}
                className={`
                  relative cursor-pointer group
                  ${cartel.rotacion}
                  hover:rotate-0 hover:scale-105 hover:-translate-y-2
                  transition-all duration-300 ease-out
                `}
              >
                {/* Pin/Chinche */}
                <div 
                  className={`
                    absolute -top-3 left-1/2 -translate-x-1/2 z-20
                    w-6 h-6 rounded-full ${cartel.pinColor}
                    shadow-lg
                  `}
                  style={{
                    boxShadow: "0 2px 4px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full" />
                </div>

                {/* Tarjeta/Post-it */}
                <div 
                  className={`
                    ${cartel.color} 
                    w-48 sm:w-56 p-6 rounded-lg
                    shadow-xl
                    group-hover:shadow-2xl
                    transition-shadow duration-300
                  `}
                  style={{
                    boxShadow: "4px 4px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="text-verde/80 mb-4 flex justify-center">
                    {cartel.icono}
                  </div>
                  <h3 className="text-xl font-bold text-verde text-center mb-2">
                    {cartel.titulo}
                  </h3>
                  <p className="text-verde/60 text-sm text-center">
                    {cartel.descripcion}
                  </p>
                  
                  {/* Flecha indicadora */}
                  <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-verde text-sm font-medium">Abrir →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decoraciones adicionales en la pizarra */}
          <div className="absolute bottom-6 right-6 opacity-30">
            <svg className="w-16 h-16 text-amber-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}