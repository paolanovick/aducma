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

      </div>
    </div>
  );
}
