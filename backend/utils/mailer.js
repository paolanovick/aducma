import "dotenv/config";
import axios from "axios";

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

export const enviarNotificacion = async (tipo, datos) => {
  const plantillas = {
    inscripcion: {
      subject: "📋 Nueva inscripción a curso",
      html: `
        <h2>Nueva inscripción recibida</h2>
        <p><strong>Nombre:</strong> ${datos.nombre || "-"}</p>
        <p><strong>Email:</strong> ${datos.email || "-"}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono || "-"}</p>
        <p><strong>Curso:</strong> ${datos.cursoNombre || datos.curso || "-"}</p>
        ${datos.mensaje ? `<p><strong>Mensaje:</strong> ${datos.mensaje}</p>` : ""}
      `,
    },

    adhesion: {
      subject: "👥 Nueva solicitud de adhesión",
      html: `
        <h2>Nueva adhesión recibida</h2>
        <p><strong>Nombre:</strong> ${datos.nombre || "-"}</p>
        <p><strong>Email:</strong> ${datos.email || "-"}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono || "-"}</p>
        ${datos.mensaje ? `<p><strong>Mensaje:</strong> ${datos.mensaje}</p>` : ""}
      `,
    },

    contacto: {
      subject: "📩 Nuevo mensaje de contacto",
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${datos.nombre || "-"}</p>
        <p><strong>Email:</strong> ${datos.email || "-"}</p>
        <p><strong>Asunto:</strong> ${datos.asunto || "-"}</p>
        <p>${datos.mensaje || "-"}</p>
      `,
    },

    denuncia: {
      subject: "🚨 Nueva denuncia recibida",
      html: `
        <h2>Nueva denuncia recibida</h2>
        <p><strong>Nombre:</strong> ${datos.nombre || "-"}</p>
        <p><strong>Email:</strong> ${datos.email || "-"}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono || "-"}</p>
        <p><strong>Tipo:</strong> ${datos.tipo || "-"}</p>
        <p><strong>Descripción:</strong></p>
        <p>${datos.descripcion || "-"}</p>
      `,
    },
  };

  const plantilla = plantillas[tipo];
  if (!plantilla) {
    console.error("❌ Tipo de notificación no soportado:", tipo);
    return;
  }

  try {
    await axios.post(
      BREVO_URL,
      {
        sender: {
          email: process.env.EMAIL_FROM,
          name: "ADUCMA Web",
        },
        to: [{ email: process.env.EMAIL_TO }],
        subject: plantilla.subject,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto">
            ${plantilla.html}
            <hr>
            <p style="font-size:12px;color:#777">
              Este mensaje fue enviado automáticamente desde el sitio web de ADUCMA.
            </p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log(`✅ Email de ${tipo} enviado por Brevo API`);
  } catch (error) {
    console.error(
      `❌ Error enviando email de ${tipo}:`,
      error.response?.data || error.message
    );
  }
};
