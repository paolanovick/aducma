import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContenidoModal from "./ContenidoModal";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [vista, setVista] = useState("novedades"); // novedades | cursos
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    cargar();
  }, [vista]);

  const cargar = async () => {
    setCargando(true);

    const url =
      vista === "novedades"
        ? `${API}/api/novedades/todas`
        : `${API}/api/cursos/todas`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setItems(data);
    setCargando(false);
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar definitivamente?")) return;

    await fetch(`${API}/api/${vista}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    cargar();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-crema">
      {/* HEADER */}
      <header className="bg-verde text-white px-6 py-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="bg-white/20 px-4 py-2 rounded-lg text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* TABS + BOTÓN */}
        <div className="flex justify-between items-center mb-6">
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setVista("novedades")}
              className={`px-5 py-2 rounded-xl font-medium ${
                vista === "novedades"
                  ? "bg-verde text-white"
                  : "bg-white border"
              }`}
            >
              Novedades
            </button>
            <button
              onClick={() => setVista("cursos")}
              className={`px-5 py-2 rounded-xl font-medium ${
                vista === "cursos"
                  ? "bg-verde text-white"
                  : "bg-white border"
              }`}
            >
              Cursos
            </button>
          </div>

          {/* Botón único */}
          <button
            onClick={() => setModalOpen(true)}
            className="bg-verde text-white px-6 py-3 rounded-xl font-semibold"
          >
            + Agregar contenido
          </button>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-verde/10">
              <tr>
                <th className="p-4 text-left">Título</th>
                <th className="p-4 text-left">Fecha</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center">
                    Cargando…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center">
                    No hay contenido
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-4 font-medium">{item.titulo}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {item.fecha}
                    </td>
                    <td className="p-4">
                      {item.activo === false ? "Oculto" : "Activo"}
                    </td>
                    <td className="p-4 text-right space-x-3">
                    <button
  onClick={() => {
    setItemEditando(item);
    setModalOpen(true);
  }}
  className="text-blue-600 hover:underline"
>
  Editar
</button>

                      <button
                        onClick={() => eliminar(item._id)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL */}
    {modalOpen && (
  <ContenidoModal
    token={token}
    itemEditando={itemEditando}
    onClose={() => {
      setModalOpen(false);
      setItemEditando(null);
    }}
    onGuardado={cargar}
  />
)}

    </div>
  );
}
