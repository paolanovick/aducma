import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function InscripcionesAdmin() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    cargarInscripciones();
  }, [token, navigate]);

  const cargarInscripciones = async () => {
    try {
      const res = await fetch(`${API}/api/inscripciones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInscripciones(data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setCargando(false);
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar esta inscripción?")) return;
    await fetch(`${API}/api/inscripciones/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    cargarInscripciones();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-crema flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-verde border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crema">
      {/* HEADER */}
      <header className="bg-verde text-white py-4 px-6 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-crema/70 hover:text-crema flex items-center gap-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
            <span className="text-crema/60">|</span>
            <h1 className="text-xl font-bold">ADUCMA</h1>
            <span className="text-crema/60">|</span>
            <span className="text-crema/80">Inscripciones</span>
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

      {/* CONTENIDO */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-verde">Inscripciones a Cursos</h2>
          <p className="text-verde/60">{inscripciones.length} inscripciones recibidas</p>
        </div>

        {inscripciones.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-verde/50 text-lg">No hay inscripciones todavía</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {inscripciones.map((ins) => (
              <div key={ins._id} className="bg-white rounded-2xl p-6 shadow-md border border-verde/10">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-verde text-lg">{ins.nombre}</h3>
                      <span className="bg-verde/10 text-verde text-xs px-2 py-1 rounded-full">
                        {ins.curso?.titulo || "Curso eliminado"}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-verde/70">
                      <p>📧 {ins.email}</p>
                      {ins.telefono && <p>📱 {ins.telefono}</p>}
                    </div>
                    {ins.mensaje && (
                      <p className="mt-3 text-verde/80 bg-crema p-3 rounded-lg text-sm">
                        "{ins.mensaje}"
                      </p>
                    )}
                    <p className="mt-3 text-xs text-verde/40">
                      {new Date(ins.createdAt).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => eliminar(ins._id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}