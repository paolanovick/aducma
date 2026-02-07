import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://167.172.31.249:5002";

export default function AdhesionesAdmin() {
  const [adhesiones, setAdhesiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdhesiones();
  }, []);

  const fetchAdhesiones = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/adhesiones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar");
      const data = await res.json();
      setAdhesiones(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar esta adhesión?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API}/api/adhesiones/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdhesiones(adhesiones.filter((a) => a._id !== id));
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-crema">
      <header className="bg-verde text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Adhesiones</h1>
        </div>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
          {adhesiones.length} solicitudes
        </span>
      </header>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde"></div>
          </div>
        ) : adhesiones.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No hay solicitudes de adhesión</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {adhesiones.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-verde text-lg">{a.nombre}</h3>
                    <p className="text-gray-600 text-sm mt-1">{a.email}</p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      {a.telefono && (
                        <span className="flex items-center gap-1">
                          📞 {a.telefono}
                        </span>
                      )}
                      {a.ciudad && (
                        <span className="flex items-center gap-1">
                          📍 {a.ciudad}
                        </span>
                      )}
                    </div>

                    {a.mensaje && (
                      <p className="mt-3 text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                        "{a.mensaje}"
                      </p>
                    )}

                    <p className="text-xs text-gray-400 mt-3">
                      {formatDate(a.createdAt)}
                    </p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <a
                      href={`https://wa.me/54${a.telefono?.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      title="WhatsApp"
                    >
                      📱
                    </a>
                    <a
                      href={`mailto:${a.email}`}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Email"
                    >
                      ✉️
                    </a>
                    <button
                      onClick={() => eliminar(a._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
