export default function ModalDenuncia({
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

      <div className="relative bg-crema rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-crema px-6 py-4 border-b border-verde/10 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h3 className="text-xl font-bold text-verde">
              Formulario de Denuncia
            </h3>
            <p className="text-sm text-gray-500">
              Tu información es confidencial
            </p>
          </div>
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
                ¡Denuncia recibida!
              </h4>
              <p className="text-gray-600">
                Analizaremos tu caso y te contactaremos.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Categoría de denuncia */}
              <div className="bg-verde/5 rounded-xl p-4 space-y-4">
                <h4 className="font-semibold text-verde flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Tipo de denuncia
                </h4>

                <div>
                  <label className="block text-sm font-medium text-verde mb-1">
                    ¿Sobre qué querés denunciar? *
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                  >
                    <option value="">Seleccioná una categoría</option>
                    <option value="consumidores">
                      🛒 Consumidores y Usuarios
                    </option>
                    <option value="ambiente">🌿 Medio Ambiente</option>
                    <option value="animales">🐾 Protección Animal</option>
                  </select>
                </div>
              </div>

              {/* Subcategorías */}
              {formData.categoria === "consumidores" && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-medium text-verde mb-1">
                    Motivo específico *
                  </label>
                  <select
                    name="motivo"
                    value={formData.motivo}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                  >
                    <option value="">Seleccioná el motivo</option>
                    <option value="art4_informacion">
                      Infracción Art. 4 - Deber de Información
                    </option>
                    <option value="art8_trato_digno">
                      Infracción Art. 8 Bis - Deber de Trato Digno
                    </option>
                    <option value="seguridad">
                      Infracción al Deber de Seguridad
                    </option>
                    <option value="cobros_indebidos">Cobros Indebidos</option>
                    <option value="producto_atado">
                      Producto Atado a Otro Producto
                    </option>
                    <option value="otros_consumidor">Otros</option>
                  </select>
                </div>
              )}

              {formData.categoria === "ambiente" && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-medium text-verde mb-1">
                    Motivo específico *
                  </label>
                  <select
                    name="motivo"
                    value={formData.motivo}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                  >
                    <option value="">Seleccioná el motivo</option>
                    <option value="contaminacion">
                      Contaminación de aire, agua y suelo
                    </option>
                    <option value="desmontes">Desmontes no autorizados</option>
                    <option value="quema_basura">Quema de basura</option>
                    <option value="comercio_fauna">
                      Comercio ilegal de fauna silvestre
                    </option>
                    <option value="ruidos">Ruidos molestos</option>
                    <option value="residuos_peligrosos">
                      Manejo inadecuado de residuos peligrosos
                    </option>
                    <option value="areas_naturales">
                      Afectación a áreas naturales
                    </option>
                    <option value="otros_ambiente">Otros</option>
                  </select>
                </div>
              )}

              {formData.categoria === "animales" && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-medium text-verde mb-1">
                    Motivo específico *
                  </label>
                  <select
                    name="motivo"
                    value={formData.motivo}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                  >
                    <option value="">Seleccioná el motivo</option>
                    <option value="maltrato_fisico">Maltrato físico</option>
                    <option value="abandono">Abandono</option>
                    <option value="otros_animales">Otros</option>
                  </select>
                </div>
              )}

              {/* Datos personales */}
              <div className="bg-verde/5 rounded-xl p-4 space-y-4">
                <h4 className="font-semibold text-verde flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Datos personales
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-verde mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={onChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-verde mb-1">
                      DNI *
                    </label>
                    <input
                      type="text"
                      name="dni"
                      value={formData.dni}
                      onChange={onChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-verde mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={onChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-verde mb-1">
                    Ciudad / Provincia *
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none"
                  />
                </div>
              </div>

              {/* Detalles de la denuncia */}
              <div className="bg-verde/5 rounded-xl p-4 space-y-4">
                <h4 className="font-semibold text-verde flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Detalles de la denuncia
                </h4>

                <div>
                  <label className="block text-sm font-medium text-verde mb-1">
                    {formData.categoria === "consumidores"
                      ? "Empresa / Persona reclamada *"
                      : formData.categoria === "ambiente"
                        ? "Lugar / Responsable *"
                        : formData.categoria === "animales"
                          ? "Ubicación / Responsable *"
                          : "Empresa / Persona / Lugar *"}
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-verde mb-1">
                    Fecha del hecho (aproximada)
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={onChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-verde mb-1">
                    Descripción del problema *
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={onChange}
                    required
                    rows={4}
                    placeholder="Describí con el mayor detalle posible..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-verde focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-verde mb-1">
                    Adjuntar comprobantes (opcional)
                  </label>
                  <input
                    type="file"
                    name="archivo"
                    onChange={onChange}
                    accept="image/*,.pdf"
                    className="hidden"
                    id="archivo-input"
                  />
                  <label
                    htmlFor="archivo-input"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-verde transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-gray-500">
                      {formData.archivo
                        ? formData.archivo.name
                        : "Subir imagen o PDF"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Checkbox privacidad */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacidad"
                  checked={formData.privacidad}
                  onChange={onChange}
                  required
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-verde focus:ring-verde"
                />
                <span className="text-sm text-gray-600">
                  Acepto la{" "}
                  <a href="#" className="text-verde underline">
                    política de privacidad
                  </a>{" "}
                  y autorizo el tratamiento de mis datos. *
                </span>
              </label>

              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-verde text-white py-4 rounded-xl font-semibold hover:bg-verde-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
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
                  "Enviar denuncia"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
