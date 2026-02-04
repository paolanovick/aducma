import { useState, useEffect } from "react";
import MagicContainer from "./ui/MagicContainer";
import ModalContacto from "./modals/ModalContacto";
import ModalDenuncia from "./modals/ModalDenuncia";
import ModalAdhesion from "./modals/ModalAdhesion";

export default function Contacto() {
  const [modalOpen, setModalOpen] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const [formContacto, setFormContacto] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [formDenuncia, setFormDenuncia] = useState({ categoria: "", motivo: "", nombre: "", dni: "", email: "", telefono: "", ciudad: "", empresa: "", fecha: "", descripcion: "", archivo: null, privacidad: false });
  const [formAdhesion, setFormAdhesion] = useState({ nombre: "", email: "", telefono: "", ciudad: "", mensaje: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === "#denuncia" || hash === "#hacer-denuncia") setModalOpen("denuncia");
      else if (hash === "#consulta" || hash === "#contacto-form") setModalOpen("contacto");
      else if (hash === "#adhesion") setModalOpen("adhesion");
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const API = import.meta.env.VITE_API_URL || "http://167.172.31.249:5002";

  const handleSubmit = async (e, tipo) => {
    e.preventDefault();
    setEnviando(true);

    try {
      let endpoint = "";
      let data = {};

      if (tipo === "adhesion") {
        endpoint = `${API}/api/adhesiones`;
        data = formAdhesion;
      } else if (tipo === "contacto") {
        endpoint = `${API}/api/contactos`;
        data = formContacto;
      } else if (tipo === "denuncia") {
        endpoint = `${API}/api/denuncias`;
        data = formDenuncia;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error en el servidor");

      setEnviado(true);
      setTimeout(() => {
        setModalOpen(null);
        setEnviado(false);
        setFormContacto({ nombre: "", email: "", telefono: "", mensaje: "" });
        setFormDenuncia({
          categoria: "",
          motivo: "",
          nombre: "",
          dni: "",
          email: "",
          telefono: "",
          ciudad: "",
          empresa: "",
          fecha: "",
          descripcion: "",
          archivo: null,
          privacidad: false,
        });
        setFormAdhesion({
          nombre: "",
          email: "",
          telefono: "",
          ciudad: "",
          mensaje: "",
        });
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Error al enviar. Intentá de nuevo.");
    } finally {
      setEnviando(false);
    }
  };
  const closeModal = () => !enviando && setModalOpen(null);

 const tarjetas = [
   {
     id: "contacto",
     titulo: "Contacto general",
     descripcion:
       "Somos una Asociación Civil sin fines de lucro, con el compromiso con la defensa de los derechos de Usuarios y consumidores, el ambiente y los animales. Trabajamos con confidencialidad y seriedad, y ofrecemos acompañamiento responsable.",
     icono: "chat",
     color: "text-verde",
     colorBg: "bg-verde/15",
   },
   {
     id: "denuncia",
     titulo: "Realizar una denuncia",
     descripcion:
       "Si fuiste damnificado por un proveedor en los términos de la Ley 24.240 o presenciaste una situación de maltrato animal o daño ambiental, completá el formulario y nos pondremos en contacto.",
     icono: "alert",
     color: "text-red-600",
     colorBg: "bg-red-100",
   },
   {
     id: "adhesion",
     titulo: "Quiero adherirme",
     descripcion:
       "Sumate como adherente y colaborá en la defensa de los derechos de consumidores, el medio ambiente y los animales. ¡Tu ayuda es importante!",
     icono: "user-plus",
     color: "text-dorado",
     colorBg: "bg-dorado/20",
   },
 ];


  return (
    <section
      id="contacto"
      className="relative bg-crema py-24 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-crema/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-verde-light/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
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

        {/* Tarjetas */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tarjetas.map((t) => (
            <MagicContainer key={t.id} className="cursor-pointer group">
              <div
                onClick={() => setModalOpen(t.id)}
                className="relative rounded-3xl bg-white/90 backdrop-blur-xl p-10 h-full shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`w-16 h-16 ${t.colorBg} rounded-2xl flex items-center justify-center mb-6`}
                >
                  {t.icono === "chat" && (
                    <svg
                      className={`w-8 h-8 ${t.color}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  )}
                  {t.icono === "alert" && (
                    <svg
                      className={`w-8 h-8 text-${t.color}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  )}
                  {t.icono === "user-plus" && (
                    <svg
                      className={`w-8 h-8 text-${t.color}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-verde mb-4">
                  {t.titulo}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {t.descripcion}
                </p>
                <div
                  className={`inline-flex items-center gap-2 text-${t.color} font-semibold`}
                >
                  <span>
                    {t.id === "contacto"
                      ? "Enviar mensaje"
                      : t.id === "denuncia"
                        ? "Hacer una denuncia"
                        : "Completar solicitud"}
                  </span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </MagicContainer>
          ))}
        </div>
      </div>

      {/* Modales */}
      <ModalContacto
        isOpen={modalOpen === "contacto"}
        onClose={closeModal}
        formData={formContacto}
        onChange={(e) =>
          setFormContacto({ ...formContacto, [e.target.name]: e.target.value })
        }
        onSubmit={(e) => handleSubmit(e, "contacto")}
        enviando={enviando}
        enviado={enviado}
      />
      <ModalDenuncia
        isOpen={modalOpen === "denuncia"}
        onClose={closeModal}
        formData={formDenuncia}
        onChange={(e) => {
          const { name, value, type, checked, files } = e.target;
          setFormDenuncia({
            ...formDenuncia,
            [name]:
              type === "checkbox"
                ? checked
                : type === "file"
                  ? files[0]
                  : value,
          });
        }}
        onSubmit={(e) => handleSubmit(e, "denuncia")}
        enviando={enviando}
        enviado={enviado}
      />
      <ModalAdhesion
        isOpen={modalOpen === "adhesion"}
        onClose={closeModal}
        formData={formAdhesion}
        onChange={(e) =>
          setFormAdhesion({ ...formAdhesion, [e.target.name]: e.target.value })
        }
        onSubmit={(e) => handleSubmit(e, "adhesion")}
        enviando={enviando}
        enviado={enviado}
      />
    </section>
  );
}
