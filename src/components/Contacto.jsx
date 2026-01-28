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
      // Reemplazá con tu endpoint real:
      // await fetch("TU_ENDPOINT", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      setEnviado(true);
      setFormData({ nombre: "", email: "", telefono: "", tipo: "", mensaje: "" });
    } catch (err) {
      console.error(err);
      alert("Error al enviar el mensaje.");
    } finally {
      setEnviando(false);
    }
  };

  const pasos = [
    {
      numero: "01",
      titulo: "Recibimos tu consulta o denuncia",
      descripcion: "Escuchamos tu situación con atención y confidencialidad."
    },
    {
      numero: "02",
      titulo: "Analizamos la situación",
      descripcion: "Evaluamos el caso según el contexto y la normativa vigente."
    },
    {
      numero: "03",
      titulo: "Orientamos sobre los pasos a seguir",
      descripcion: "Brindamos información clara y responsable."
    },
    {
      numero: "04",
      titulo: "Acompañamos y realizamos seguimiento",
      descripcion: "Te acompañamos durante todo el proceso."
    }
  ];

  const razones = [
    { icon: "🌱", texto: "Asociación civil sin fines de lucro" },
    { icon: "💚", texto: "Compromiso con el ambiente y los animales" },
    { icon: "🔒", texto: "Confidencialidad y seriedad" },
    { icon: "🤝", texto: "Acompañamiento responsable" }
  ];

  const tiposConsulta = [
    "Denuncia por maltrato animal",
    "Denuncia por daño ambiental",
    "Consulta general",
    "Quiero ser voluntario/a",
    "Otro"
  ];

  if (enviado) {
    return (
      <section id="contacto" className="relative min-h-screen bg-verde overflow-hidden flex items-center justify-center py-20">
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
    <section id="contacto" className="relative overflow-hidden">
      
      {/* PARTE 1: CÓMO TE AYUDAMOS */}
      <div className="bg-verde py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-crema/20 backdrop-blur-sm border border-crema/30 rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 bg-crema rounded-full animate-pulse" />
              <span className="text-crema text-sm font-medium tracking-wider uppercase">
                Nuestro Proceso
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-crema">Cómo te</span>{" "}
              <span className="text-verde-light">ayudamos</span>
            </h2>
          </div>

          {/* Pasos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pasos.map((paso, index) => (
              <div 
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm border border-crema/20 rounded-2xl p-6
                           hover:bg-white/20 hover:border-crema/40 transition-all duration-300"
              >
                <span className="text-6xl font-black text-crema/10 absolute top-4 right-4 
                                 group-hover:text-crema/20 transition-colors">
                  {paso.numero}
                </span>
                <div className="relative">
                  <h3 className="text-crema font-bold text-lg mb-2">{paso.titulo}</h3>
                  <p className="text-crema/70 text-sm">{paso.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTE 2: FORMULARIO + POR QUÉ CONTACTARNOS */}
      <div className="bg-crema py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* FORMULARIO */}
            <div>
              {/* Header */}
              <div className="text-center lg:text-left mb-8">
                <div className="inline-flex items-center gap-2 bg-verde/20 border border-verde/30 rounded-full px-5 py-2 mb-6">
                  <span className="w-2 h-2 bg-verde rounded-full animate-pulse" />
                  <span className="text-verde text-sm font-medium tracking-wider uppercase">
                    Contacto
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-verde mb-4">
                  Formulario de Contacto / Denuncias
                </h2>
                <p className="text-gray-600">
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

            {/* POR QUÉ CONTACTARNOS */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-verde rounded-3xl p-8 sm:p-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-crema mb-8">
                  ¿Por qué contactarnos?
                </h3>
                
                <div className="space-y-6">
                  {razones.map((razon, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-crema/20 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                        {razon.icon}
                      </div>
                      <p className="text-crema/90 text-lg pt-2">
                        {razon.texto}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Info de contacto directo */}
                <div className="mt-10 pt-8 border-t border-crema/20">
                  <p className="text-crema/70 text-sm mb-4">También podés contactarnos por:</p>
                  
                  <div className="space-y-3">
                    <a href="https://wa.me/543517300674" target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-3 text-crema hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span>351 730 0674</span>
                    </a>
                    
                    <a href="mailto:aducmaasociacion@gmail.com"
                       className="flex items-center gap-3 text-crema hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">aducmaasociacion@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}