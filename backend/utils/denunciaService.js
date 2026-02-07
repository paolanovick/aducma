export const enviarEmailDenuncia = async (datos) => {
  try {
    const response = await fetch('https://n8n.triptest.com.ar/webhook/denuncia-aducma', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: datos.nombre,
        dni: datos.dni,
        email: datos.email,
        telefono: datos.telefono,
        ciudad: datos.ciudad,
        empresa: datos.empresa,
        categoria: datos.categoria,
        motivo: datos.motivo,
        fecha: datos.fecha || 'No especificada',
        descripcion: datos.descripcion
      }),
    });

    if (response.ok) {
      console.log("✅ Denuncia enviada a N8N correctamente");
      return true;
    } else {
      console.error("❌ Error enviando denuncia a N8N:", response.status);
      return false;
    }
  } catch (err) {
    console.error("❌ Error enviando denuncia a N8N:", err.message);
    return false;
  }
};
