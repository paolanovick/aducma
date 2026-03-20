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
    // Email a ADUCMA
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

    // Confirmación al usuario
    await transporter.sendMail({
      from: `"ADUCMA" <${process.env.EMAIL_USER}>`,
      to: datos.email,
      subject: 'Recibimos tu denuncia - ADUCMA',
      html: `
        <h2>¡Hola ${datos.nombre}!</h2>
        <p>Recibimos tu denuncia correctamente. Nuestro equipo la revisará y te contactaremos a la brevedad.</p>
        <p><strong>Categoría:</strong> ${datos.categoria}</p>
        <p><strong>Motivo:</strong> ${datos.motivo}</p>
        <hr/>
        <p>ADUCMA - Asociación Civil por el Cuidado Ambiental y los Derechos de los Animales</p>
        <p>📧 aducmaasociacion@gmail.com | 📞 351 730 0674</p>
      `,
    });

    console.log('✅ Emails denuncia enviados');
    return true;
  } catch (err) {
    console.error('❌ Error enviando email denuncia:', err.message);
    return false;
  }
};
