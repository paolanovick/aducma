export const enviarEmailAdhesion = async (datos) => {
  try {
    const response = await fetch('https://n8n.triptest.com.ar/webhook/adhesion-aducma', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono || 'No proporcionado',
        ciudad: datos.ciudad || 'No proporcionada',
        mensaje: datos.mensaje || 'Sin mensaje'
      }),
    });

    if (response.ok) {
      console.log("✅ Adhesion enviada a N8N correctamente");
      return true;
    } else {
      console.error("❌ Error enviando adhesion a N8N:", response.status);
      return false;
    }
  } catch (err) {
    console.error("❌ Error enviando adhesion a N8N:", err.message);
    return false;
  }
};
