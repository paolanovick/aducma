export const enviarEmailInscripcion = async (datos) => {
  try {
    const response = await fetch('https://n8n.triptest.com.ar/webhook/inscripcion-aducma', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono || 'No proporcionado',
        mensaje: datos.mensaje || 'Sin mensaje',
        curso: datos.cursoNombre || 'Curso'
      }),
    });

    if (response.ok) {
      console.log("✅ Inscripcion enviada a N8N correctamente");
      return true;
    } else {
      console.error("❌ Error enviando inscripcion a N8N:", response.status);
      return false;
    }
  } catch (err) {
    console.error("❌ Error enviando inscripcion a N8N:", err.message);
    return false;
  }
};
