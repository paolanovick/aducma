export default function ModalAdhesion({ 
  isOpen, 
  onClose, 
  formData, 
  onChange, 
  onSubmit, 
  enviando, 
  enviado 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-crema rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-crema px-6 py-4 border-b border-verde/10 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h3 className="text-xl font-bold text-verde">Formulario de Adhesión</h3>
            <p className="text-sm text-gray-500">Sumate a ADUCMA</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-verde/10 rounded-full transition-colors">
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
              <h4 className="text-xl font-bold text-verde mb-2">¡Solicitud enviada!</h4>
              <p className="text-gray-600">Nos pondremos en contacto pronto.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-verde mb-1">Nombre y Apellido *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-verde mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-verde mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={onChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                    placeholder="351 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-verde mb-1">Ciudad / Provincia</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={onChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                    placeholder="Córdoba"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-verde mb-1">¿Por qué querés sumarte? (opcional)</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={onChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors resize-none"
                  placeholder="Contanos brevemente tu motivación..."
                />
              </div>
  {/* Links de contacto directo */}
              <div className="bg-verde/5 rounded-xl p-4">
                <p className="text-sm text-verde/70 text-center mb-3">O contactanos directamente:</p>
                <div className="flex justify-center gap-4">
                  
                     <a href="https://wa.me/543517300674?text=Hola!%20Me%20interesa%20adherirme%20a%20ADUCMA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    WhatsApp
                  </a>
                  
                     <a href="mailto:aducmaasociacion@gmail.com?subject=Quiero%20adherirme%20a%20ADUCMA"
                    className="flex items-center gap-2 bg-verde/10 hover:bg-verde/20 text-verde px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-dorado text-white py-4 rounded-xl font-semibold hover:bg-dorado/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
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
                  "Quiero adherirme"
                )}
              </button>
            </form>
          )}


      </div>
      </div>
    </div>
  );
}




      