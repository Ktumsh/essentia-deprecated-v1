<script>
  import ArrowUp from "../icons/arrow-up.svelte";
  import { getCohereStream } from "@/services/ia";
  import { onMount } from "svelte";

  export let data = {};

  const { "data-astro-cid": _dataAstroCid, ...filteredProps } = data;

  let messages = [];
  let userImageUrl = "";
  let loading = true;
  let typing = false;
  let isSending = false;
  let currentBotMessage = "";
  let chatHistory = [];
  let currentSessionName = "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputEl = document.getElementById("message-input");
    const text = inputEl.value.trim();
    if (text) {
      addMessage(text, "user", userImageUrl);
      inputEl.value = "";
      try {
        isSending = true;
        typing = true;
        currentBotMessage = "";
        addTypingIndicator();

        await getCohereStream(text, (update) => {
          currentBotMessage = update;
          updateTypingMessage(formatTextToHTML(currentBotMessage), "bot");
        });

        finalizeBotMessage();
        typing = false;
        isSending = false;
      } catch (error) {
        console.error("Error fetching AI response:", error);
        addMessage("Hubo un error al obtener la respuesta de la IA.", "bot");
        removeTypingIndicator();
        typing = false;
        isSending = false;
      }
    }
  };

  function addMessage(text, sender, imageUrl = "") {
    messages = [...messages, { id: generateId(), text, sender, imageUrl }];
  }

  function addTypingIndicator() {
    if (!messages.some((message) => message.typing)) {
      messages = [
        ...messages,
        {
          id: generateId(),
          text: "...",
          sender: "bot",
          typing: true,
        },
      ];
    }
  }

  function removeTypingIndicator() {
    messages = messages.filter((message) => !message.typing);
  }

  function updateTypingMessage(text, sender) {
    if (messages.length > 0 && messages[messages.length - 1].typing) {
      messages[messages.length - 1].text = text;
    } else {
      addMessage(text, sender);
    }
    messages = [...messages];
  }

  function finalizeBotMessage() {
    if (messages.length > 0 && messages[messages.length - 1].typing) {
      messages[messages.length - 1].typing = false;
    }
    saveChatHistory();
  }

  function generateId() {
    return "_" + Math.random().toString(36).substring(2, 9);
  }

  function saveChatHistory() {
    const sessionId = generateId();
    if (!currentSessionName) {
      currentSessionName = generateChatNameFromFirstMessage(messages);
    }
    const now = new Date();
    const dateTime = `${now.toLocaleDateString("es-ES")} ${now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`;
    chatHistory.push({
      sessionId,
      name: currentSessionName,
      dateTime,
      messages,
    });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }

  function loadChatHistory() {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      chatHistory = JSON.parse(savedHistory);
    }
  }

  function selectChatSession(sessionId) {
    const selectedSession = chatHistory.find(
      (session) => session.sessionId === sessionId
    );
    if (selectedSession) {
      messages = selectedSession.messages;
    }
  }

  function generateChatNameFromFirstMessage(messages) {
    const firstUserMessage = messages.find(
      (message) => message.sender === "user"
    );
    return firstUserMessage ? firstUserMessage.text : "Chat sin título";
  }

  function formatTextToHTML(text) {
    text = text.replace(/\*\*/g, "");

    const paragraphs = text
      .split("\n")
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);
    let firstParagraph = true;

    const formattedParagraphs = paragraphs.map((paragraph) => {
      if (paragraph.startsWith("- ")) {
        const items = paragraph.split("- ").filter((item) => item.length > 0);
        return `<ul class="list-disc list-inside">${items
          .map((item) => {
            if (item.includes(":")) {
              const parts = item.split(":");
              return `<li><strong class="font-medium">${parts[0].trim()}</strong>: ${parts.slice(1).join(":").trim()}</li>`;
            }
            return `<li>${item.trim()}</li>`;
          })
          .join("")}</ul>`;
      }
      if (paragraph.includes(":") && !firstParagraph) {
        const parts = paragraph.split(":");
        return `<p><strong class="font-medium">${parts[0].trim()}</strong>: ${parts.slice(1).join(":").trim()}</p>`;
      }
      firstParagraph = false;
      return `<p>${paragraph}</p>`;
    });

    return formattedParagraphs.join("<br>");
  }

  onMount(() => {
    loadChatHistory();
    const imgEl = document.querySelector("#user-image");
    if (imgEl) {
      userImageUrl = imgEl.getAttribute("data-user-image-url");
    }
    setTimeout(() => {
      loading = false;
      addMessage(
        formatTextToHTML("Hola! Cuéntame, ¿en qué puedo ayudarte hoy? 😊"),
        "bot"
      );
    }, 1000);
  });
</script>

<div
  class="message-list-container flex-grow size-full min-h-[68vh] p-5 overflow-y-auto scroll-smooth"
>
  {#if loading}
    <ul class="flex flex-col h-full absolute inset-0">
      <li
        class="loading flex flex-col items-center justify-center h-full text-center"
      >
        <i
          class="size-10 border-[0.4em] border-gray-200 dark:border-base-dark border-t-transparent dark:border-t-transparent rounded-full animate-spin"
        ></i>
        <h4 class="mb-2">Cargando...</h4>
        <h5 class="text-[10px] opacity-40">Paciencia, por favor.</h5>
      </li>
    </ul>
  {:else}
    <ul class="flex flex-col h-full">
      {#each messages as message (message.id)}
        <li
          class="group flex flex-col mx-1 px-1 py-2 message {message.sender} "
        >
          <span
            class="user-image flex items-center justify-center size-8 rounded-full bg-base-full-dark font-xs"
          >
            {#if message.sender === "user" && message.imageUrl}
              <img
                src={message.imageUrl}
                alt="User Avatar"
                class="size-8 rounded-full shadow-md"
              />
            {:else if message.sender === "bot"}
              <img
                src="/e-logomark-on-dark.webp"
                alt="Essentia AI"
                class="size-5 rounded-full shadow-md"
              />
            {/if}
          </span>
          <p
            class="px-5 py-2 mt-1 rounded-full bg-transparent group-[.user]:text-base-color group-[.user]:dark:text-white group-[.user]:bg-white dark:group-[.user]:bg-base-dark"
          >
            {@html message.text}
          </p>
        </li>
      {/each}
    </ul>
  {/if}
</div>
<form
  on:submit|preventDefault={handleSubmit}
  class="message-input-container flex h-14 w-full"
>
  <div
    class="flex items-center justify-center size-full shadow-md bg-white dark:bg-base-dark rounded-full"
  >
    <input
      id="message-input"
      autocomplete="off"
      class="flex-grow py-2 px-5 mr-2 border-none outline-none bg-transparent"
      placeholder="Escribe tu mensaje aquí..."
    />
    <button
      id="send-btn"
      type="submit"
      class="flex items-center justify-center size-9 mx-2 shadow-md disabled:opacity-60 disabled:pointer-events-none bg-bittersweet-400 dark:bg-cerise-red-600 text-white dark:text-base-dark rounded-full hover:brightness-90 text-sm"
      disabled={isSending}
    >
      <ArrowUp />
    </button>
  </div>
  {#if chatHistory.length > 0}
    <div
      class="hidden absolute left-0 -top-20 ml-5 lg:flex flex-col max-w-64 h-[calc(100dvh-92px)] items-start p-3 border border-gray-100/50 dark:border-base-full-dark-50 bg-black/10 dark:bg-none dark:bg-base-full-dark-40 backdrop-blur backdrop-saturate-150 rounded-xl shadow-md font-motivasans text-base-color dark:text-base-color-dark"
    >
      <div
        class="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5"
      ></div>
      <div
        class="flex items-center justify-center w-full h-10 mb-4 bg-black/5 dark:bg-base-full-dark-30 rounded-lg border border-gray-100/50 dark:border-base-full-dark-50"
      >
        <h3 class="w-full text-base font-medium text-center">
          Chats anteriores
        </h3>
      </div>

      <div class="inner-scrollbar w-full h-full overflow-y-scroll">
        {#each chatHistory as session}
          <button
            on:click={() => selectChatSession(session.sessionId)}
            class="flex flex-col w-full text-sm px-3 mb-4 gap-1 hover:brightness-90"
          >
            <div
              title={session.name}
              class="w-full max-w-64 text-ellipsis text-start line-clamp-2"
            >
              {session.name}
            </div>
            <span
              class="w-full text-end text-[10px] text-base-color-m dark:text-base-color-dark-m"
              >{session.dateTime}</span
            >
          </button>
        {/each}
      </div>
    </div>
  {/if}
</form>

<style>
  .inner-scrollbar::-webkit-scrollbar {
    width: 6px; /* Chrome, Safari, and Opera */
    height: 6px; /* Chrome, Safari, and Opera */
  }

  .inner-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .inner-scrollbar-container {
    padding-right: 6px; /* Reserve space for scrollbar */
  }

  .message {
    &.user {
      align-self: flex-end;
      align-items: flex-end;
    }

    &.bot {
      align-self: flex-start;
    }
  }

  button:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
</style>
