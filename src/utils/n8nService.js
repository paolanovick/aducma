export const enviarAn8n = async (tipo, datos) => {
  const webhook = import.meta.env[`VITE_N8N_WEBHOOK_${tipo.toUpperCase()}`];

  if (!webhook) {
    console.warn(`Webhook de ${tipo} no configurado`);
    return;
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...datos,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(`Error n8n: ${response.status}`);
    }
  } catch (error) {
    console.error("Error conectando con n8n:", error);
  }
};
