let chatHistory = [];
const initialPrompt =
  "You belong to Essentia and your name is Essentia AI, you are a female AI expert in health and well-being and you only have to answer questions related to that topic and that is why you give your best advice to questions asked in Spanish by people residing in Chile.";

export async function getCohereStream(input, onUpdate) {
  // Agregar el prompt inicial solo la primera vez
  if (chatHistory.length === 0) {
    chatHistory.push({ role: "system", message: initialPrompt });
  }

  const data = {
    model: "command-r-plus",
    message: input,
    temperature: 0.3,
    chat_history: chatHistory.map((entry) => ({
      role: entry.role,
      message: entry.message,
    })),
    prompt_truncation: "AUTO",
    stream: true,
    connectors: [{ id: "web-search" }],
  };

  try {
    const response = await fetch("/api/cohere", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `API error: ${response.status} ${response.statusText} - ${errorDetails}`
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Procesar los fragmentos completos de JSON
      const parts = buffer.split("\n");
      buffer = parts.pop(); // Guardar el fragmento incompleto

      for (const part of parts) {
        try {
          const parsedResponse = JSON.parse(part);
          if (parsedResponse.text) {
            fullText += parsedResponse.text;
            onUpdate(fullText);
          }
        } catch (e) {
          console.error("Failed to parse JSON part:", part, e);
        }
      }
    }

    // Agregar la entrada del usuario y la respuesta de la IA al historial de chat
    chatHistory.push({ role: "user", message: input });
    chatHistory.push({ role: "assistant", message: fullText });

    return { text: fullText };
  } catch (error) {
    console.error("Failed to fetch AI response:", error);
    throw error;
  }
}
