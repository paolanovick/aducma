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

export const enviarEmailContacto = async (datos) => {
  try {
    await transporter.sendMail({
      from: `"ADUCMA Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nuevo contacto de ${datos.nombre}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong> ${datos.mensaje}</p>
        <hr/>
        <small>Enviado desde aducma.org.ar</small>
      `,
    });
    console.log('✅ Email contacto enviado');
    return true;
  } catch (err) {
    console.error('❌ Error enviando email contacto:', err.message);
    return false;
  }
};
