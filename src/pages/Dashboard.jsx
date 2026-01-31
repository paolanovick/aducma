import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;


export default function Dashboard() {
  const [novedades, setNovedades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    contenido: "",
    fecha: "",
    imagen: "",
    height: 400,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    cargarNovedades();
  }, [token, navigate]);

  const cargarNovedades = async () => {
    try {
     const res = await fetch(`${API}/api/novedades/todas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNovedades(data);
      } else {
        localStorage.removeItem("token");
        navigate("/admin");
      }
    } catch (err) {
      console.error("Error al cargar novedades:", err);
    } finally {
      setCargando(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const abrirModal = (novedad = null) => {
    if (novedad) {
      setEditando(novedad._id);
      setForm({
        titulo: novedad.titulo,
        descripcion: novedad.descripcion,
        contenido: novedad.contenido,
        fecha: novedad.fecha,
        imagen: novedad.imagen,
        height: novedad.height,
      });
    } else {
      setEditando(null);
      setForm({
        titulo: "",
        descripcion: "",
        contenido: "",
        fecha: "",
        imagen: "",
        height: 400,
      });
    }
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setEditando(null);
  };

  const guardarNovedad = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const url = editando
  ? `${API}/api/novedades/${editando}`
  : `${API}/api/novedades`;
      const method = editando ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        cerrarModal();
        cargarNovedades();
      } else {
        const data = await res.json();
        alert(data.mensaje || "Error al guardar");
      }
    } catch (err) {
      alert("Error de conexión");
    } finally {
      setGuardando(false);
    }
  };

  const eliminarNovedad = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta novedad?")) return;

    try {
      const res = await fetch(`${API}/api/novedades/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        cargarNovedades();
      }
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  const toggleActivo = async (novedad) => {
    try {
     await fetch(`${API}/api/novedades/${novedad._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...novedad, activo: !novedad.activo }),
      });
      cargarNovedades();
    } catch (err) {
      alert("Error al actualizar");
    }
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
            <h1 className="text-xl font-bold">ADUCMA</h1>
            <span className="text-crema/60">|</span>
            <span className="text-crema/80">Dashboard</span>
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
        {/* Título y botón agregar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-verde">Novedades</h2>
            <p className="text-verde/60">{novedades.length} novedades en total</p>
          </div>
          <button
            onClick={() => abrirModal()}
            className="bg-verde text-white px-6 py-3 rounded-xl font-semibold hover:bg-verde-dark transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Novedad
          </button>
        </div>

        {/* GRID DE NOVEDADES */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {novedades.map((novedad) => (
            <div
              key={novedad._id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md border transition-all ${
                novedad.activo ? "border-verde/10" : "border-red-200 opacity-60"
              }`}
            >
              {/* Imagen */}
              <div className="relative h-48">
                <img
                  src={novedad.imagen}
                  alt={novedad.titulo}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                  novedad.activo ? "bg-verde text-white" : "bg-red-500 text-white"
                }`}>
                  {novedad.activo ? "Activo" : "Inactivo"}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-verde/50 text-sm mb-1">{novedad.fecha}</p>
                <h3 className="font-bold text-verde mb-2 line-clamp-1">{novedad.titulo}</h3>
                <p className="text-verde/70 text-sm line-clamp-2">{novedad.descripcion}</p>
              </div>

              {/* Acciones */}
              <div className="px-4 pb-4 flex gap-2">
                <button
                  onClick={() => abrirModal(novedad)}
                  className="flex-1 bg-verde/10 text-verde py-2 rounded-lg text-sm font-medium hover:bg-verde/20 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => toggleActivo(novedad)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    novedad.activo
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {novedad.activo ? "Ocultar" : "Mostrar"}
                </button>
                <button
                  onClick={() => eliminarNovedad(novedad._id)}
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

        {novedades.length === 0 && (
          <div className="text-center py-16">
            <p className="text-verde/50 text-lg mb-4">No hay novedades todavía</p>
            <button
              onClick={() => abrirModal()}
              className="bg-verde text-white px-6 py-3 rounded-xl font-semibold"
            >
              Crear la primera
            </button>
          </div>
        )}
      </main>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={cerrarModal} />

          <div className="relative bg-crema rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-crema px-6 py-4 border-b border-verde/10 flex items-center justify-between rounded-t-3xl z-10">
              <h3 className="text-xl font-bold text-verde">
                {editando ? "Editar Novedad" : "Nueva Novedad"}
              </h3>
              <button onClick={cerrarModal} className="p-2 hover:bg-verde/10 rounded-full transition-colors">
                <svg className="w-5 h-5 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={guardarNovedad} className="p-6 space-y-5">
              {/* Imagen */}
              <div>
                <label className="block text-sm font-medium text-verde mb-2">Imagen *</label>
                <div className="relative">
                  {form.imagen ? (
                    <div className="relative rounded-xl overflow-hidden h-48">
                      <img src={form.imagen} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, imagen: "" })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-verde/30 rounded-xl cursor-pointer hover:border-verde transition-colors">
                      <svg className="w-10 h-10 text-verde/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-verde/60">Click para subir imagen</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-verde mb-1">Título *</label>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-verde/20 rounded-xl focus:border-verde focus:outline-none"
                />
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-verde mb-1">Fecha *</label>
                <input
                  type="text"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  required
                  placeholder="Ej: 15 de Febrero, 2025"
                  className="w-full px-4 py-3 border border-verde/20 rounded-xl focus:border-verde focus:outline-none"
                />
              </div>

              {/* Descripción corta */}
              <div>
                <label className="block text-sm font-medium text-verde mb-1">Descripción corta *</label>
                <input
                  type="text"
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  required
                  placeholder="Breve descripción para la tarjeta"
                  className="w-full px-4 py-3 border border-verde/20 rounded-xl focus:border-verde focus:outline-none"
                />
              </div>

              {/* Contenido completo */}
              <div>
                <label className="block text-sm font-medium text-verde mb-1">Contenido completo *</label>
                <textarea
                  value={form.contenido}
                  onChange={(e) => setForm({ ...form, contenido: e.target.value })}
                  required
                  rows={8}
                  placeholder="Texto completo de la novedad..."
                  className="w-full px-4 py-3 border border-verde/20 rounded-xl focus:border-verde focus:outline-none resize-none"
                />
              </div>

              {/* Altura en masonry */}
              <div>
                <label className="block text-sm font-medium text-verde mb-1">Altura en galería</label>
                <select
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-verde/20 rounded-xl focus:border-verde focus:outline-none"
                >
                  <option value={250}>Pequeña (250px)</option>
                  <option value={400}>Mediana (400px)</option>
                  <option value={600}>Grande (600px)</option>
                </select>
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="flex-1 py-3 border border-verde/30 text-verde rounded-xl font-medium hover:bg-verde/10 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando || !form.imagen}
                  className="flex-1 bg-verde text-white py-3 rounded-xl font-semibold hover:bg-verde-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {guardando ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    "Guardar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}