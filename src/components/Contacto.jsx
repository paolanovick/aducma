import { useState } from "react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEnviado(true);
      setFormData({ nombre: "", email: "", telefono: "", tipo: "", mensaje: "" });
    } catch (err) {
      console.error(err);
      alert("Error al enviar el mensaje.");
    } finally {
      setEnviando(false);
    }
  };

  const tiposConsulta = [
    "Denuncia por maltrato animal",
    "Denuncia por daño ambiental",
    "Consulta general",
    "Quiero ser voluntario/a",
    "Otro"
  ];

  if (enviado) {
    return (
      <section id="contacto" className="relative min-h-[60vh] bg-verde overflow-hidden flex items-center justify-center py-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-verde-light/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-crema/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="w-24 h-24 mx-auto mb-8 bg-crema rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-crema mb-4">
            ¡Mensaje enviado!
          </h3>
          <p className="text-crema/80 text-lg mb-8 max-w-md mx-auto">
            Gracias por contactarnos. Revisaremos tu mensaje y te responderemos a la brevedad.
          </p>
          <button
            onClick={() => setEnviado(false)}
            className="bg-crema text-verde px-8 py-3 rounded-full font-semibold hover:bg-white transition-colors"
          >
            Enviar otro mensaje
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="bg-crema py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-verde/20 border border-verde/30 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-verde rounded-full animate-pulse" />
            <span className="text-verde text-sm font-medium tracking-wider uppercase">
              Contacto
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-verde">Formulario de</span>{" "}
            <span className="text-verde-light">Contacto</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-verde/50" />
            <svg className="w-6 h-6 text-verde-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-verde/50" />
          </div>

          <p className="text-gray-600 max-w-xl mx-auto">
            Si presenciaste una situación de maltrato animal o daño ambiental, 
            completá el formulario y nos pondremos en contacto.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Nombre */}
          <div className="relative">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              onFocus={() => setFocusedField("nombre")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl
                         focus:border-verde focus:outline-none transition-all
                         placeholder-transparent"
              placeholder="Nombre"
            />
            <label className={`absolute left-4 transition-all duration-200 pointer-events-none
                              ${formData.nombre || focusedField === "nombre" 
                                ? "-top-2.5 text-xs bg-crema px-2 text-verde font-medium" 
                                : "top-4 text-gray-400"}`}>
              Nombre completo *
            </label>
          </div>

          {/* Email y Teléfono */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl
                           focus:border-verde focus:outline-none transition-all
                           placeholder-transparent"
                placeholder="Email"
              />
              <label className={`absolute left-4 transition-all duration-200 pointer-events-none
                                ${formData.email || focusedField === "email" 
                                  ? "-top-2.5 text-xs bg-crema px-2 text-verde font-medium" 
                                  : "top-4 text-gray-400"}`}>
                Email *
              </label>
            </div>

            <div className="relative">
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                onFocus={() => setFocusedField("telefono")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl
                           focus:border-verde focus:outline-none transition-all
                           placeholder-transparent"
                placeholder="Teléfono"
              />
              <label className={`absolute left-4 transition-all duration-200 pointer-events-none
                                ${formData.telefono || focusedField === "telefono" 
                                  ? "-top-2.5 text-xs bg-crema px-2 text-verde font-medium" 
                                  : "top-4 text-gray-400"}`}>
                Teléfono (opcional)
              </label>
            </div>
          </div>

          {/* Tipo de consulta */}
          <div className="relative">
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl
                         focus:border-verde focus:outline-none transition-all
                         appearance-none cursor-pointer"
            >
              <option value="">Seleccioná el tipo de consulta *</option>
              {tiposConsulta.map((tipo, i) => (
                <option key={i} value={tipo}>{tipo}</option>
              ))}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Mensaje */}
          <div className="relative">
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              onFocus={() => setFocusedField("mensaje")}
              onBlur={() => setFocusedField(null)}
              required
              rows={5}
              className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl
                         focus:border-verde focus:outline-none transition-all
                         resize-none placeholder-transparent"
              placeholder="Mensaje"
            />
            <label className={`absolute left-4 transition-all duration-200 pointer-events-none
                              ${formData.mensaje || focusedField === "mensaje" 
                                ? "-top-2.5 text-xs bg-crema px-2 text-verde font-medium" 
                                : "top-4 text-gray-400"}`}>
              Describí tu consulta o denuncia *
            </label>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-verde text-white py-4 rounded-xl font-semibold
                       hover:bg-verde-dark active:scale-[0.98] transition-all
                       disabled:opacity-70 disabled:cursor-not-allowed
                       flex items-center justify-center gap-3"
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
              <>
                Enviar consulta / denuncia
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

      </div>
    </section>
  );
}