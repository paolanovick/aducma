import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContenidoModal from "./ContenidoModal";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [vista, setVista] = useState("novedades");
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);

  // Configuración de todas las pestañas
  const pestañas = [
    { id: "novedades", nombre: "Novedades", icono: "📰", tipo: "contenido" },
    { id: "cursos", nombre: "Cursos", icono: "🎓", tipo: "contenido" },
    {
      id: "inscripciones",
      nombre: "Inscripciones",
      icono: "📋",
      tipo: "formulario",
    },
    { id: "adhesiones", nombre: "Adhesiones", icono: "👥", tipo: "formulario" },
    { id: "contactos", nombre: "Contactos", icono: "📩", tipo: "formulario" },
    { id: "denuncias", nombre: "Denuncias", icono: "🚨", tipo: "formulario" },
  ];

  const pestañaActual = pestañas.find((p) => p.id === vista);
  const esContenido = pestañaActual?.tipo === "contenido";

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    cargar();
  }, [vista]);

  const cargar = async () => {
    setCargando(true);
    try {
      let url;
      if (vista === "novedades") {
        url = `${API}/api/novedades/todas`;
      } else if (vista === "cursos") {
        url = `${API}/api/cursos/todas`;
      } else {
        url = `${API}/api/${vista}`;
      }

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error cargando:", error);
    }
    setCargando(false);
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar definitivamente?")) return;

    await fetch(`${API}/api/${vista}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    cargar();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  // Columnas según la vista
  const getColumnas = () => {
    switch (vista) {
      case "novedades":
      case "cursos":
        return ["titulo", "fecha", "activo"];
      case "inscripciones":
        return ["nombre", "email", "telefono", "curso", "fecha"];
      case "adhesiones":
        return ["nombre", "email", "telefono", "mensaje", "fecha"];
      case "contactos":
        return ["nombre", "email", "asunto", "mensaje", "fecha"];
      case "denuncias":
        return ["nombre", "email", "tipo", "descripcion", "fecha"];
      default:
        return ["nombre", "email", "fecha"];
    }
  };

  const formatearColumna = (col) => {
    const nombres = {
      titulo: "Título",
      nombre: "Nombre",
      email: "Email",
      telefono: "Teléfono",
      curso: "Curso",
      fecha: "Fecha",
      activo: "Estado",
      mensaje: "Mensaje",
      asunto: "Asunto",
      tipo: "Tipo",
      descripcion: "Descripción",
    };
    return nombres[col] || col;
  };

  const renderCelda = (item, col) => {
    const valor = item[col];

    // Estado activo/oculto
    if (col === "activo") {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            valor === false
              ? "bg-gray-200 text-gray-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {valor === false ? "Oculto" : "Activo"}
        </span>
      );
    }

    if (!valor) return "-";

    // Truncar textos largos
    if (["mensaje", "descripcion"].includes(col) && valor.length > 40) {
      return valor.substring(0, 40) + "...";
    }

    // Formatear fecha
    if (col === "fecha" && !esContenido) {
      return new Date(valor).toLocaleDateString("es-AR");
    }

    return valor;
  };

  return (
    <div className="min-h-screen bg-crema">
      {/* HEADER */}
      <header className="bg-verde text-white px-6 py-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Panel de Administración</h1>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-crema/70 hover:text-crema text-sm"
            >
              Ver sitio →
            </a>
            <button
              onClick={handleLogout}
              className="bg-white/20 px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* PESTAÑAS + BOTÓN AGREGAR */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          {/* Todas las pestañas */}
          <div className="flex gap-2 flex-wrap">
            {pestañas.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setVista(tab.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  vista === tab.id
                    ? "bg-verde text-white"
                    : "bg-white border hover:bg-gray-50"
                }`}
              >
                {tab.icono} {tab.nombre}
              </button>
            ))}
          </div>

          {/* Botón agregar (solo para contenido) */}
          {esContenido && (
            <button
              onClick={() => setModalOpen(true)}
              className="bg-verde text-white px-6 py-3 rounded-xl font-semibold hover:bg-verde/90 transition-colors"
            >
              + Agregar {vista === "novedades" ? "novedad" : "curso"}
            </button>
          )}
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-verde/10">
                <tr>
                  {getColumnas().map((col) => (
                    <th key={col} className="p-4 text-left whitespace-nowrap">
                      {formatearColumna(col)}
                    </th>
                  ))}
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr>
                    <td
                      colSpan={getColumnas().length + 1}
                      className="p-6 text-center text-gray-500"
                    >
                      Cargando…
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={getColumnas().length + 1}
                      className="p-6 text-center text-gray-500"
                    >
                      No hay {vista}
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-50">
                      {getColumnas().map((col) => (
                        <td key={col} className="p-4 text-sm" title={item[col]}>
                          {renderCelda(item, col)}
                        </td>
                      ))}
                      <td className="p-4 text-right space-x-3">
                        {esContenido && (
                          <button
                            onClick={() => {
                              setItemEditando(item);
                              setModalOpen(true);
                            }}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Editar
                          </button>
                        )}
                        <button
                          onClick={() => eliminar(item._id)}
                          className="text-red-600 hover:underline text-sm"
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
        </div>
      </main>

      {/* MODAL */}
      {modalOpen && (
        <ContenidoModal
          token={token}
          tipo={vista}
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
