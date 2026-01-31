import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;



export default function NovedadDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
 const [novedad, setNovedad] = useState(null);
const [cargando, setCargando] = useState(true);
useEffect(() => {
  const cargarNovedad = async () => {
    try {
      const res = await fetch(`${API}/api/novedades/${id}`);
      const data = await res.json();
      setNovedad(data);
    } catch (err) {
      console.error("Error cargando novedad", err);
    } finally {
      setCargando(false);
    }
  };

  cargarNovedad();
}, [id]);


  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
if (cargando) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Cargando...
    </div>
  );
}

  if (!novedad) {
    return (
      <div className="min-h-screen bg-crema flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-verde mb-4">Novedad no encontrada</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-verde text-white px-6 py-3 rounded-full hover:bg-verde-light transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setEnviado(true);
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch (err) {
      alert("Error al enviar");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="bg-crema min-h-screen">
      
      {/* HERO DE LA NOVEDAD */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={novedad.imagen}
          alt={novedad.titulo}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Botón volver */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-24 left-6 z-20 flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 
                     rounded-full px-4 py-2 text-white hover:bg-white/30 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver</span>
        </button>

        {/* Título sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-verde/80 backdrop-blur-sm rounded-full px-4 py-1 mb-4">
              <span className="text-white text-sm font-medium">{novedad.fecha}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              {novedad.titulo}
            </h1>
            <p className="text-white/80 text-lg">{novedad.descripcion}</p>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Texto del contenido */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-verde/10 mb-16">
          <div className="prose prose-lg max-w-none">
            {novedad.contenido.split("\n").map((linea, i) => (
              <p key={i} className="text-verde/80 mb-4 whitespace-pre-line">
                {linea}
              </p>
            ))}
          </div>
        </div>

        {/* FORMULARIO DE INSCRIPCIÓN */}
        <div className="relative">
          {/* Header del formulario */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-verde/20 backdrop-blur-sm border border-verde/30 rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 bg-verde rounded-full animate-pulse" />
              <span className="text-verde text-sm font-medium tracking-wider uppercase">
                Inscripción
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
              <span className="text-verde">¿Te interesa?</span>{" "}
              <span className="text-verde-light">Inscribite</span>
            </h2>
            
            <p className="text-verde/70 max-w-xl mx-auto">
              Completá el formulario y nos pondremos en contacto para brindarte más información.
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-verde/10">
            {enviado ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-verde/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-verde mb-2">¡Inscripción enviada!</h4>
                <p className="text-gray-600">Te contactaremos pronto con más información.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-verde mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-crema/50 border border-verde/20 rounded-xl focus:border-verde focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-verde mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-crema/50 border border-verde/20 rounded-xl focus:border-verde focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-verde mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-crema/50 border border-verde/20 rounded-xl focus:border-verde focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-verde mb-1">Mensaje o consulta</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    placeholder="¿Tenés alguna consulta sobre este curso/evento?"
                    className="w-full px-4 py-3 bg-crema/50 border border-verde/20 rounded-xl focus:border-verde focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full bg-verde text-white py-4 rounded-xl font-semibold hover:bg-verde-dark transition-colors
                             disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {enviando ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    "Enviar inscripción"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
