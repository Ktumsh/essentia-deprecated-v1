let chatHistory = [];
const initialPrompt =
  "You belong to Essentia and your name is Essentia AI, you are a female AI expert in health and well-being and you only have to answer questions related to that topic and that is why you give your best advice to questions asked in Spanish by people residing in Chile.";

export async function getCohereStream(input, onUpdate) {
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

      const parts = buffer.split("\n");
      buffer = parts.pop();

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

    // Add the user's input to the chat history
    chatHistory.push({ role: "user", message: input });
    chatHistory.push({ role: "chatbot", message: fullText });

    return { text: fullText };
  } catch (error) {
    console.error("Failed to fetch AI response:", error);
    throw error;
  }
}

async function getCohereStreamWithRetry(input, onUpdate) {
  let reconnectionAttempts = 0;
  try {
    await getCohereStream(input, onUpdate);
  } catch (error) {
    while (reconnectionAttempts < 3) {
      reconnectionAttempts++;
      console.log(`Reconnecting... Attempt ${reconnectionAttempts}`);
      try {
        await getCohereStream(input, onUpdate);
        return; // Exit if successful
      } catch (retryError) {
        console.error(
          `Reconnection attempt ${reconnectionAttempts} failed.`,
          retryError
        );
      }
    }
    throw new Error("Failed to reconnect after 3 attempts.");
  }
}
