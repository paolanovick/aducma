import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const enviarEmailAdhesion = async (datos) => {
  try {
    // Email a ADUCMA
    await transporter.sendMail({
      from: `"ADUCMA Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nueva solicitud de adhesión de ${datos.nombre}`,
      html: `
        <h2>Nueva solicitud de adhesión</h2>
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono || 'No proporcionado'}</p>
        <p><strong>Ciudad:</strong> ${datos.ciudad || 'No proporcionada'}</p>
        <p><strong>Mensaje:</strong> ${datos.mensaje || 'Sin mensaje'}</p>
        <hr/>
        <small>Enviado desde aducma.org.ar</small>
      `,
    });

    // Confirmación al usuario
    await transporter.sendMail({
      from: `"ADUCMA" <${process.env.EMAIL_USER}>`,
      to: datos.email,
      subject: 'Recibimos tu solicitud de adhesión - ADUCMA',
      html: `
        <h2>¡Hola ${datos.nombre}!</h2>
        <p>Recibimos tu solicitud de adhesión a ADUCMA. Nos pondremos en contacto a la brevedad para informarte los próximos pasos.</p>
        <hr/>
        <p>ADUCMA - Asociación Civil por el Cuidado Ambiental y los Derechos de los Animales</p>
        <p>📧 aducmaasociacion@gmail.com | 📞 351 730 0674</p>
      `,
    });

    console.log('✅ Emails adhesion enviados');
    return true;
  } catch (err) {
    console.error('❌ Error enviando email adhesion:', err.message);
    return false;
  }
};
