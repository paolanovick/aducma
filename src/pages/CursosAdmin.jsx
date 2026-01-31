import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function CursosAdmin() {
  const [cursos, setCursos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    contenido: "",
    fecha: "",
    imagen: "",
    height: 400
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/admin");
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    const res = await fetch(`${API}/api/cursos/todas`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setCursos(data);
  };

  const guardarCurso = async (e) => {
    e.preventDefault();

    const url = editando
      ? `${API}/api/cursos/${editando}`
      : `${API}/api/cursos`;

    const method = editando ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    setModalOpen(false);
    setEditando(null);
    cargarCursos();
  };

  return (
    <div className="min-h-screen bg-crema p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-verde">Cursos</h1>
        <button
          onClick={() => {
            setForm({
              titulo: "",
              descripcion: "",
              contenido: "",
              fecha: "",
              imagen: "",
              height: 400
            });
            setModalOpen(true);
          }}
          className="bg-verde text-white px-6 py-3 rounded-xl"
        >
          Nuevo curso
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cursos.map((c) => (
          <div key={c._id} className="bg-white rounded-xl shadow">
            <img src={c.imagen} className="h-40 w-full object-cover rounded-t-xl" />
            <div className="p-4">
              <h3 className="font-bold">{c.titulo}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{c.descripcion}</p>
              <button
                onClick={() => {
                  setEditando(c._id);
                  setForm(c);
                  setModalOpen(true);
                }}
                className="mt-3 text-verde font-medium"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <form onSubmit={guardarCurso} className="bg-white p-6 rounded-xl w-full max-w-xl space-y-4">
            <input
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              placeholder="Título"
              required
              className="w-full px-4 py-3 border rounded-xl"
            />
            <input
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              placeholder="Fecha"
              required
              className="w-full px-4 py-3 border rounded-xl"
            />
            <input
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              placeholder="Descripción corta"
              required
              className="w-full px-4 py-3 border rounded-xl"
            />
            <input
              value={form.imagen}
              onChange={(e) => setForm({ ...form, imagen: e.target.value })}
              placeholder="URL de imagen"
              required
              className="w-full px-4 py-3 border rounded-xl"
            />
            <textarea
              value={form.contenido}
              onChange={(e) => setForm({ ...form, contenido: e.target.value })}
              rows={6}
              placeholder="Contenido completo"
              required
              className="w-full px-4 py-3 border rounded-xl"
            />
            <button className="w-full bg-verde text-white py-3 rounded-xl">
              Guardar curso
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
