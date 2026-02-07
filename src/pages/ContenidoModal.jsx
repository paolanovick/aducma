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

    const endpoint = tipo === "novedad" ? "novedades" : "cursos";

    const url = editando
      ? `${API}/api/${endpoint}/${itemEditando._id}`
      : `${API}/api/${endpoint}`;

    const method = editando ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
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

        <input
          placeholder="URL de imagen"
          value={form.imagen}
          onChange={(e) =>
            setForm({ ...form, imagen: e.target.value })
          }
          required
          className="w-full px-4 py-3 border rounded-xl"
        />

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
