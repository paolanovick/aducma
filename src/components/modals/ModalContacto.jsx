export default function ModalContacto({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  enviando,
  enviado,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-crema rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-crema px-6 py-4 border-b border-verde/10 flex items-center justify-between rounded-t-3xl">
          <h3 className="text-xl font-bold text-verde">Contacto General</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-verde/10 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-verde"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {enviado ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-verde/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-verde"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-verde mb-2">
                ¡Mensaje enviado!
              </h4>
              <p className="text-gray-600">Te responderemos pronto.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-verde mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-verde mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-verde mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={onChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-verde mb-1">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={onChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-verde text-white py-3 rounded-xl font-semibold hover:bg-verde-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {enviando ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
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
  );
}
