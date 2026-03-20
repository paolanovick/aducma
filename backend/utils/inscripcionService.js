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

export const enviarEmailInscripcion = async (datos) => {
  try {
    await transporter.sendMail({
      from: `"ADUCMA Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nueva inscripción al curso: ${datos.cursoNombre || 'Curso'} - ${datos.nombre}`,
      html: `
        <h2>Nueva inscripción a curso</h2>
        <p><strong>Curso:</strong> ${datos.cursoNombre || 'No especificado'}</p>
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong> ${datos.mensaje || 'Sin mensaje'}</p>
        <hr/>
        <small>Enviado desde aducma.org.ar</small>
      `,
    });
    console.log('✅ Email inscripcion enviado');
    return true;
  } catch (err) {
    console.error('❌ Error enviando email inscripcion:', err.message);
    return false;
  }
};
