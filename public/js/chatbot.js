import { CreateWebWorkerMLCEngine } from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/+esm";

document.addEventListener("astro:page-load", async () => {
  const $ = (el) => document.querySelector(el);

  const $form = $("#message-form");
  const $input = $("#message-input");
  const $template = $("#message-template");
  const $messages = $("ul");
  const $container = $("main");
  const $button = $("#send-btn");
  const $info = $("#message-status");
  const $loading = $(".loading");

  let messages = [];
  let end = false;

  const SELECTED_MODEL = "Llama-3-8B-Instruct-q4f32_1-MLC-1k";

  const engine = await CreateWebWorkerMLCEngine(
    new Worker("/public/js/worker.js", { type: "module" }),
    SELECTED_MODEL,
    {
      initProgressCallback: (info) => {
        $info.textContent = info.text;
        if (info.progress === 1 && !end) {
          end = true;
          $loading?.parentNode?.removeChild($loading);
          $button.removeAttribute("disabled");
          addMessage(
            "¡Hola! Soy la IA de Essentia. ¿En qué puedo ayudarte hoy?",
            "bot"
          );
          $input.focus();
        }
      },
    }
  );

  const userImageUrl =
    document.querySelector("#user-image").getAttribute("data-user-image-url") ||
    "";

  $form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const messageText = $input.value.trim();

    if (messageText !== "") {
      // añadimos el mensaje en el DOM
      $input.value = "";
      addMessage(messageText, "user", userImageUrl);
    }

    $button.setAttribute("disabled", "");

    const userMessage = {
      role: "user",
      content: messageText,
    };

    messages.push(userMessage);

    const chunks = await engine.chat.completions.create({
      messages,
      stream: true,
    });

    let reply = "";

    const $botMessage = addMessage("", "bot");

    for await (const chunk of chunks) {
      const choice = chunk.choices[0];
      const content = choice?.delta?.content ?? "";
      reply += content;
      $botMessage.textContent = reply;
    }

    $button.removeAttribute("disabled");
    messages.push({
      role: "assistant",
      content: reply,
    });
    $container.scrollTop = $container.scrollHeight;
  });

  function addMessage(text, sender, userImageUrl = "") {
    // clonar el template
    const clonedTemplate = $template.content.cloneNode(true);
    const $newMessage = clonedTemplate.querySelector(".message");

    const $who = $newMessage.querySelector("span");
    const $text = $newMessage.querySelector("p");

    $text.textContent = text;

    if (sender === "bot") {
      const img = document.createElement("img");
      img.src = "/e-logomark-on-dark.webp";
      img.alt = "Essentia AI";
      img.classList.add("size-5", "rounded-full", "shadow-md");
      $who.appendChild(img);
    } else {
      const img = document.createElement("img");
      img.src = userImageUrl;
      img.alt = "Avatar de usuario";
      img.classList.add("size-8", "rounded-full", "shadow-md");
      $who.appendChild(img);
    }

    $newMessage.classList.add(sender);

    $messages.appendChild($newMessage);

    $container.scrollTop = $container.scrollHeight;

    return $text;
  }
});
