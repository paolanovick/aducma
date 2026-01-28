import { useState } from "react";

export default function Contacto() {
  const [modalOpen, setModalOpen] = useState(null); // 'contacto' | 'denuncia' | null
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  
  const [formContacto, setFormContacto] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [formDenuncia, setFormDenuncia] = useState({
    nombre: "",
    dni: "",
    email: "",
    telefono: "",
    ciudad: "",
    empresa: "",
    motivo: "",
    descripcion: "",
    fecha: "",
    archivo: null,
    privacidad: false,
  });

  const motivosDenuncia = [
    "Maltrato animal",
    "Abandono de animales",
    "Contaminación ambiental",
    "Tala ilegal",
    "Caza furtiva",
    "Ruidos molestos",
    "Residuos peligrosos",
    "Otro"
  ];

  const handleContactoChange = (e) => {
    setFormContacto({ ...formContacto, [e.target.name]: e.target.value });
  };

  const handleDenunciaChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormDenuncia({ ...formDenuncia, [name]: checked });
    } else if (type === "file") {
      setFormDenuncia({ ...formDenuncia, [name]: files[0] });
    } else {
      setFormDenuncia({ ...formDenuncia, [name]: value });
    }
  };

  const handleSubmit = async (e, tipo) => {
    e.preventDefault();
    setEnviando(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Acá va tu endpoint real
      setEnviado(true);
      setTimeout(() => {
        setModalOpen(null);
        setEnviado(false);
        setFormContacto({ nombre: "", email: "", telefono: "", mensaje: "" });
        setFormDenuncia({ nombre: "", dni: "", email: "", telefono: "", ciudad: "", empresa: "", motivo: "", descripcion: "", fecha: "", archivo: null, privacidad: false });
      }, 2000);
    } catch (err) {
      alert("Error al enviar");
    } finally {
      setEnviando(false);
    }
  };

  const closeModal = () => {
    if (!enviando) setModalOpen(null);
  };

  return (
    <section id="contacto" className="relative bg-verde py-24 overflow-hidden">
      
      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-crema/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-verde-light/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-crema/20 backdrop-blur-sm border border-crema/30 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-crema rounded-full animate-pulse" />
            <span className="text-crema text-sm font-medium tracking-wider uppercase">
              Contacto
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-crema">¿Cómo podemos</span>{" "}
            <span className="text-verde-light">ayudarte?</span>
          </h2>
          
          <p className="text-crema/80 text-lg max-w-2xl mx-auto">
            Elegí la opción que mejor se ajuste a tu necesidad
          </p>
        </div>

        {/* DOS OPCIONES */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* CARD CONTACTO */}
          <div 
            onClick={() => setModalOpen('contacto')}
            className="group relative bg-crema/10 backdrop-blur-sm border border-crema/20 rounded-3xl p-8 cursor-pointer
                       hover:bg-crema/20 hover:border-crema/40 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-16 h-16 bg-crema/20 rounded-2xl flex items-center justify-center mb-6
                            group-hover:bg-crema/30 group-hover:scale-110 transition-all">
              <svg className="w-8 h-8 text-crema" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-crema mb-3">Contacto General</h3>
            <p className="text-crema/70 mb-6">
              Consultas, información sobre voluntariado, colaboraciones o cualquier otra pregunta.
            </p>
            
            <div className="flex items-center gap-2 text-verde-light font-medium group-hover:gap-3 transition-all">
              <span>Enviar mensaje</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* CARD DENUNCIA */}
          <div 
            onClick={() => setModalOpen('denuncia')}
            className="group relative bg-crema/10 backdrop-blur-sm border border-crema/20 rounded-3xl p-8 cursor-pointer
                       hover:bg-crema/20 hover:border-crema/40 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-16 h-16 bg-crema/20 rounded-2xl flex items-center justify-center mb-6
                            group-hover:bg-crema/30 group-hover:scale-110 transition-all">
              <svg className="w-8 h-8 text-crema" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-crema mb-3">Realizar Denuncia</h3>
            <p className="text-crema/70 mb-6">
              Reportá situaciones de maltrato animal o daño ambiental. Tu denuncia es confidencial.
            </p>
            
            <div className="flex items-center gap-2 text-verde-light font-medium group-hover:gap-3 transition-all">
              <span>Denunciar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

        </div>

        {/* INFO ADICIONAL */}
        <div className="mt-16 text-center">
          <p className="text-crema/60 text-sm mb-4">También podés contactarnos directamente:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://wa.me/543517300674" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-crema hover:text-verde-light transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>351 730 0674</span>
            </a>
            <a href="mailto:aducmaasociacion@gmail.com"
               className="flex items-center gap-2 text-crema hover:text-verde-light transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>aducmaasociacion@gmail.com</span>
            </a>
          </div>
        </div>

      </div>

      {/* MODAL CONTACTO */}
      {modalOpen === 'contacto' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative bg-crema rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-crema px-6 py-4 border-b border-verde/10 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-xl font-bold text-verde">Contacto General</h3>
              <button onClick={closeModal} className="p-2 hover:bg-verde/10 rounded-full transition-colors">
                <svg className="w-5 h-5 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6">
              {enviado ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-verde/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-verde mb-2">¡Mensaje enviado!</h4>
                  <p className="text-gray-600">Te responderemos pronto.</p>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, 'contacto')} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-verde mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formContacto.nombre}
                      onChange={handleContactoChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-verde mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formContacto.email}
                      onChange={handleContactoChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-verde mb-1">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formContacto.telefono}
                      onChange={handleContactoChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-verde mb-1">Mensaje *</label>
                    <textarea
                      name="mensaje"
                      value={formContacto.mensaje}
                      onChange={handleContactoChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full bg-verde text-white py-3 rounded-xl font-semibold hover:bg-verde-dark transition-colors
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
                      "Enviar mensaje"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DENUNCIA */}
      {modalOpen === 'denuncia' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative bg-crema rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-crema px-6 py-4 border-b border-verde/10 flex items-center justify-between rounded-t-3xl z-10">
              <div>
                <h3 className="text-xl font-bold text-verde">Formulario de Denuncia</h3>
                <p className="text-sm text-gray-500">Tu información es confidencial</p>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-verde/10 rounded-full transition-colors">
                <svg className="w-5 h-5 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6">
              {enviado ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-verde/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-verde mb-2">¡Denuncia recibida!</h4>
                  <p className="text-gray-600">Analizaremos tu caso y te contactaremos.</p>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, 'denuncia')} className="space-y-4">
                  
                  {/* Datos personales */}
                  <div className="bg-verde/5 rounded-xl p-4 space-y-4">
                    <h4 className="font-semibold text-verde flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Datos personales
                    </h4>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-verde mb-1">Nombre y Apellido *</label>
                        <input
                          type="text"
                          name="nombre"
                          value={formDenuncia.nombre}
                          onChange={handleDenunciaChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-verde mb-1">DNI *</label>
                        <input
                          type="text"
                          name="dni"
                          value={formDenuncia.dni}
                          onChange={handleDenunciaChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-verde mb-1">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formDenuncia.email}
                          onChange={handleDenunciaChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-verde mb-1">Teléfono *</label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formDenuncia.telefono}
                          onChange={handleDenunciaChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-verde mb-1">Ciudad / Provincia *</label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formDenuncia.ciudad}
                        onChange={handleDenunciaChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Datos de la denuncia */}
                  <div className="bg-verde/5 rounded-xl p-4 space-y-4">
                    <h4 className="font-semibold text-verde flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Datos de la denuncia
                    </h4>

                    <div>
                      <label className="block text-sm font-medium text-verde mb-1">Empresa / Persona reclamada *</label>
                      <input
                        type="text"
                        name="empresa"
                        value={formDenuncia.empresa}
                        onChange={handleDenunciaChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-verde mb-1">Motivo del reclamo *</label>
                        <select
                          name="motivo"
                          value={formDenuncia.motivo}
                          onChange={handleDenunciaChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">Seleccioná un motivo</option>
                          {motivosDenuncia.map((motivo, i) => (
                            <option key={i} value={motivo}>{motivo}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-verde mb-1">Fecha del hecho</label>
                        <input
                          type="date"
                          name="fecha"
                          value={formDenuncia.fecha}
                          onChange={handleDenunciaChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-verde mb-1">Descripción del problema *</label>
                      <textarea
                        name="descripcion"
                        value={formDenuncia.descripcion}
                        onChange={handleDenunciaChange}
                        required
                        rows={4}
                        placeholder="Describí con el mayor detalle posible la situación..."
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-verde mb-1">Adjuntar comprobantes (opcional)</label>
                      <div className="relative">
                        <input
                          type="file"
                          name="archivo"
                          onChange={handleDenunciaChange}
                          accept="image/*,.pdf"
                          className="hidden"
                          id="archivo-input"
                        />
                        <label 
                          htmlFor="archivo-input"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-verde transition-colors"
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="text-gray-500">
                            {formDenuncia.archivo ? formDenuncia.archivo.name : "Subir imagen o PDF"}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Checkbox privacidad */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="privacidad"
                      checked={formDenuncia.privacidad}
                      onChange={handleDenunciaChange}
                      required
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-verde focus:ring-verde"
                    />
                    <span className="text-sm text-gray-600">
                      Acepto la <a href="#" className="text-verde underline">política de privacidad</a> y autorizo el tratamiento de mis datos para gestionar esta denuncia. *
                    </span>
                  </label>

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
                        Enviando denuncia...
                      </>
                    ) : (
                      "Enviar denuncia"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}