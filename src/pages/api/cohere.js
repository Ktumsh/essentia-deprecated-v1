const COHERE_API_URL = "https://api.cohere.com/v1/chat";
const COHERE_API_KEY = import.meta.env.COHERE_API_KEY;

export async function POST({ request }) {
  if (!COHERE_API_KEY) {
    return new Response("API key not provided", { status: 500 });
  }

  try {
    const body = await request.json();
    console.log("Request body:", body);

    const response = await fetch(COHERE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${COHERE_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error text from Cohere API:", errorText);
      throw new Error(
        `API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const responseText = await response.text();
    console.log("Response text from Cohere API:", responseText);

    // Enviar la respuesta directamente al cliente
    return new Response(responseText, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response("Error processing the request", { status: 500 });
  }
}
