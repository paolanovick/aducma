import { useState } from "react";
import MagicContainer from "./ui/MagicContainer";


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
    <section id="contacto" className="relative bg-crema py-24 overflow-hidden">


      
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
  <span className="text-verde">Estamos para</span>{" "}
  <span className="text-verde-dark">escucharte</span>
</h2>

          
         <p className="text-verde/70 text-lg max-w-2xl mx-auto">
  Contactanos o realizá una denuncia de forma simple y confidencial
</p>

        </div>

       {/* DOS TARJETAS */}
{/* MAGIC CARDS */}
{/* MAGIC CARDS */}
<div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

  {/* CONTACTO */}
 {/* CONTACTO */}
<MagicContainer className="cursor-pointer group">
    <div
      onClick={() => setModalOpen('contacto')}
      className="relative rounded-3xl bg-white/90 backdrop-blur-xl p-10 h-full
                 shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      <div className="w-16 h-16 bg-verde/15 rounded-2xl flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12
                   c0 4.418-4.03 8-9 8a9.863 9.863 0
                   01-4.255-.949L3 20l1.395-3.72
                   C3.512 15.042 3 13.574 3 12
                   c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-verde mb-4">
        Contacto general
      </h3>

      <p className="text-gray-700 leading-relaxed mb-8">
        Si querés conocernos, colaborar, sumarte como voluntario
        o realizar cualquier consulta, dejá tu mensaje y te responderemos.
      </p>

      <div className="inline-flex items-center gap-2 text-verde font-semibold">
        <span>Enviar mensaje</span>
        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </div>
    </div>
  </MagicContainer>

  {/* DENUNCIA */}
  {/* CONTACTO */}
<MagicContainer className="cursor-pointer group">
    <div
      onClick={() => setModalOpen('denuncia')}
      className="relative rounded-3xl bg-white/90 backdrop-blur-xl p-10 h-full
                 shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4
                   h13.856c1.54 0 2.502-1.667
                   1.732-3L13.732 4
                   c-.77-1.333-2.694-1.333
                   -3.464 0L3.34 16
                   c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-verde mb-4">
        Realizar una denuncia
      </h3>

      <p className="text-gray-700 leading-relaxed mb-8">
        Si fuiste damnificado por un proveedor en los términos de la Ley 24.240 o presenciaste una situación de maltrato animal o daño ambiental, completá el formulario y nos pondremos en contacto.
      </p>

      <div className="inline-flex items-center gap-2 text-red-600 font-semibold">
        <span>Hacer una denuncia</span>
        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </div>
    </div>
  </MagicContainer>

</div>


        {/* INFO ADICIONAL */}
       <div className="mt-20">
  <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-lg border border-verde/10 text-center">
    
    <p className="text-verde font-semibold mb-6">
      También podés contactarnos directamente
    </p>

    <div className="flex flex-wrap justify-center gap-8">
      <a
        href="https://wa.me/543517300674"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-verde hover:text-verde-dark transition-colors font-medium"
      >
        {/* icon */}
        <span>351 730 0674</span>
      </a>

      <a
        href="mailto:aducmaasociacion@gmail.com"
        className="flex items-center gap-3 text-verde hover:text-verde-dark transition-colors font-medium"
      >
        {/* icon */}
        <span>aducmaasociacion@gmail.com</span>
      </a>
    </div>
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