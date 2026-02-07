import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

export default function CursoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const cargarCurso = async () => {
      try {
        const res = await fetch(`${API}/api/cursos/${id}`);
        const data = await res.json();
        setCurso(data);
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargarCurso();
  }, [id]);

  if (cargando) {
    return <div className="min-h-screen flex items-center justify-center">Cargando…</div>;
  }

  if (!curso) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Curso no encontrado</h1>
        <button onClick={() => navigate("/")} className="bg-verde text-white px-6 py-3 rounded-full">
          Volver
        </button>
      </div>
    );
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const res = await fetch(`${API}/api/inscripciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, curso: id })
      });

      if (!res.ok) throw new Error();

      setEnviado(true);
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch {
      alert("Error al enviar inscripción");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="bg-crema min-h-screen">
      {/* HERO */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={curso.imagen} alt={curso.titulo} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <button
          onClick={() => navigate("/")}
          className="absolute top-24 left-6 bg-white/20 text-white px-4 py-2 rounded-full"
        >
          ← Volver
        </button>

        <div className="absolute bottom-0 p-8 max-w-4xl mx-auto">
          <p className="text-white/80 mb-2">{curso.fecha}</p>
          <h1 className="text-4xl font-bold text-white">{curso.titulo}</h1>
          <p className="text-white/80 mt-2">{curso.descripcion}</p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-16">
          {curso.contenido.split("\n").map((linea, i) => (
            <p key={i} className="text-verde/80 mb-4 whitespace-pre-line">
              {linea}
            </p>
          ))}
        </div>

       {/* FORMULARIO */}
<div className="bg-white rounded-3xl p-8 shadow-lg">
  <div className="text-center mb-8">
    <h3 className="text-2xl font-bold text-verde mb-2">¿Te interesa este curso?</h3>
    <p className="text-verde/70">Completá el siguiente formulario y nos pondremos en contacto con vos.</p>
  </div>

  {enviado ? (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-verde/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-verde mb-2">¡Inscripción enviada!</h3>
      <p className="text-verde/70">Nos pondremos en contacto con vos.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre completo"
        required
        className="w-full px-4 py-3 border border-verde/20 rounded-xl focus:border-verde focus:outline-none"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full px-4 py-3 border border-verde/20 rounded-xl focus:border-verde focus:outline-none"
      />
      <input
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        className="w-full px-4 py-3 border border-verde/20 rounded-xl focus:border-verde focus:outline-none"
      />
      <textarea
        name="mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        placeholder="Mensaje o consulta (opcional)"
        rows={4}
        className="w-full px-4 py-3 border border-verde/20 rounded-xl focus:border-verde focus:outline-none resize-none"
      />
      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-verde text-white py-4 rounded-xl font-semibold hover:bg-verde-dark transition-colors disabled:opacity-70"
      >
        {enviando ? "Enviando…" : "Enviar inscripción"}
      </button>
    </form>
  )}
</div>
      </div>
    </div>
  );
}
