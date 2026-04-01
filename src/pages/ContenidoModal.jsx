import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function ContenidoModal({
  token,
  onClose,
  onGuardado,
  itemEditando
}) {
  const editando = Boolean(itemEditando);

  const [tipo, setTipo] = useState("novedad");
  const [guardando, setGuardando] = useState(false);
  const [modoImagen, setModoImagen] = useState("url"); // "url" | "archivo"
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    fecha: "",
    descripcion: "",
    imagen: "",
    contenido: "",
    height: 400
  });

  // 🔹 cargar datos al editar
  useEffect(() => {
    if (itemEditando) {
      setForm({
        titulo: itemEditando.titulo,
        fecha: itemEditando.fecha,
        descripcion: itemEditando.descripcion,
        imagen: itemEditando.imagen,
        contenido: itemEditando.contenido,
        height: itemEditando.height ?? 400
      });
      setTipo(itemEditando.tipo ?? "novedad");
    }
  }, [itemEditando]);

  const guardar = async (e) => {
    e.preventDefault();
    setGuardando(true);

    let imagenFinal = form.imagen;

    // Si hay archivo seleccionado, subirlo primero
    if (modoImagen === "archivo" && archivoSeleccionado) {
      const formData = new FormData();
      formData.append("imagen", archivoSeleccionado);
      const uploadRes = await fetch(`${API}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const uploadData = await uploadRes.json();
      imagenFinal = uploadData.url;
    }

    const endpoint = tipo === "novedad" ? "novedades" : "cursos";
    const url = editando
      ? `${API}/api/${endpoint}/${itemEditando._id}`
      : `${API}/api/${endpoint}`;

    await fetch(url, {
      method: editando ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...form, imagen: imagenFinal }),
    });

    setGuardando(false);
    onGuardado();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <form
        onSubmit={guardar}
        className="relative bg-white rounded-3xl w-full max-w-2xl p-6 space-y-4"
      >
        <h3 className="text-xl font-bold text-verde">
          {editando ? "Editar contenido" : "Agregar contenido"}
        </h3>

        {/* TIPO */}
        {!editando && (
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value="novedad">Novedad</option>
            <option value="curso">Curso</option>
          </select>
        )}

        <input
          placeholder="Título"
          value={form.titulo}
          onChange={(e) =>
            setForm({ ...form, titulo: e.target.value })
          }
          required
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          placeholder="Fecha"
          value={form.fecha}
          onChange={(e) =>
            setForm({ ...form, fecha: e.target.value })
          }
          required
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          placeholder="Descripción corta"
          value={form.descripcion}
          onChange={(e) =>
            setForm({ ...form, descripcion: e.target.value })
          }
          required
          className="w-full px-4 py-3 border rounded-xl"
        />

        {/* Selector modo imagen */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setModoImagen("url")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${modoImagen === "url" ? "bg-verde text-white border-verde" : "bg-white text-gray-600"}`}
          >
            URL de imagen
          </button>
          <button
            type="button"
            onClick={() => setModoImagen("archivo")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${modoImagen === "archivo" ? "bg-verde text-white border-verde" : "bg-white text-gray-600"}`}
          >
            Subir desde ordenador
          </button>
        </div>

        {modoImagen === "url" ? (
          <input
            placeholder="URL de imagen"
            value={form.imagen}
            onChange={(e) => setForm({ ...form, imagen: e.target.value })}
            required={modoImagen === "url"}
            className="w-full px-4 py-3 border rounded-xl"
          />
        ) : (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              required={modoImagen === "archivo" && !archivoSeleccionado}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setArchivoSeleccionado(file);
                setPreview(URL.createObjectURL(file));
              }}
              className="w-full px-4 py-3 border rounded-xl text-sm"
            />
            {preview && (
              <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-xl" />
            )}
          </div>
        )}

        <textarea
          rows={6}
          placeholder="Contenido completo"
          value={form.contenido}
          onChange={(e) =>
            setForm({ ...form, contenido: e.target.value })
          }
          required
          className="w-full px-4 py-3 border rounded-xl resize-none"
        />

        <select
          value={form.height}
          onChange={(e) =>
            setForm({ ...form, height: Number(e.target.value) })
          }
          className="w-full px-4 py-3 border rounded-xl"
        >
          <option value={250}>Tarjeta pequeña</option>
          <option value={400}>Tarjeta mediana</option>
          <option value={600}>Tarjeta grande</option>
        </select>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border py-3 rounded-xl"
          >
            Cancelar
          </button>
          <button
            disabled={guardando}
            className="flex-1 bg-verde text-white py-3 rounded-xl"
          >
            {guardando ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
