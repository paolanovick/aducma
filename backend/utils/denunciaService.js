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

export const enviarEmailDenuncia = async (datos) => {
  try {
    await transporter.sendMail({
      from: `"ADUCMA Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nueva denuncia - ${datos.categoria || 'Sin categoría'} - ${datos.nombre}`,
      html: `
        <h2>Nueva denuncia recibida</h2>
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>DNI:</strong> ${datos.dni || 'No proporcionado'}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono || 'No proporcionado'}</p>
        <p><strong>Ciudad:</strong> ${datos.ciudad || 'No proporcionada'}</p>
        <p><strong>Empresa/Organismo:</strong> ${datos.empresa || 'No especificado'}</p>
        <p><strong>Categoría:</strong> ${datos.categoria}</p>
        <p><strong>Motivo:</strong> ${datos.motivo}</p>
        <p><strong>Fecha del hecho:</strong> ${datos.fecha || 'No especificada'}</p>
        <p><strong>Descripción:</strong> ${datos.descripcion}</p>
        <hr/>
        <small>Enviado desde aducma.org.ar</small>
      `,
    });
    console.log('✅ Email denuncia enviado');
    return true;
  } catch (err) {
    console.error('❌ Error enviando email denuncia:', err.message);
    return false;
  }
};
