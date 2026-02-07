export const enviarEmailContacto = async (datos) => {
  try {
    const response = await fetch('https://n8n.triptest.com.ar/webhook/contacto-aducma', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: datos.nombre,
        email: datos.email,
        mensaje: datos.mensaje,
        telefono: datos.telefono || 'No proporcionado'
      }),
    });

    if (response.ok) {
      console.log("✅ Datos enviados a N8N correctamente");
      return true;
    } else {
      console.error("❌ Error enviando a N8N:", response.status);
      return false;
    }
  } catch (err) {
    console.error("❌ Error enviando a N8N:", err.message);
    return false;
  }
};
