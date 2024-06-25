<script>
  import Dots from "@/icons/svelte/dots.svelte";
  import ArrowUp from "@/icons/svelte/arrow-up.svelte";
  import Delete from "@/icons/svelte/delete.svelte";
  import Edit from "@/icons/svelte/edit.svelte";
  import { getCohereStream } from "@/services/ia";
  import { onMount, onDestroy } from "svelte";
  import { scale, fade } from "svelte/transition";
  import Sidebar from "@/icons/svelte/sidebar.svelte";
  import NewChat from "@/icons/svelte/new-chat.svelte";
  import Tooltip from "@/components/Tooltip.svelte";

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
  let openMenuId = null;
  let menuPosition = { top: 0, left: 0 };
  let selectedSessionId = "";
  let shouldAnimateOut = true;
  let preventClose = false;
  let editingSessionId = null;
  let showModal = false;
  let chatToDelete = null;
  let sidebarOpen = false;

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

        saveChatHistory();
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
    if (!selectedSessionId) {
      selectedSessionId = generateId();
    }

    const currentSessionIndex = chatHistory.findIndex(
      (session) => session.sessionId === selectedSessionId
    );

    if (
      currentSessionIndex !== -1 &&
      chatHistory[currentSessionIndex].name === "Nuevo chat"
    ) {
      const firstUserMessage = generateChatNameFromFirstMessage(messages);
      if (firstUserMessage) {
        chatHistory[currentSessionIndex].name = firstUserMessage;
      }
    }

    saveChatHistory();
  }

  function generateId() {
    return "_" + Math.random().toString(36).substring(2, 9);
  }

  function saveChatHistory() {
    const now = new Date();
    const dateTime = `${now.toLocaleDateString("es-ES")} ${now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`;

    const existingSessionIndex = chatHistory.findIndex(
      (session) => session.sessionId === selectedSessionId
    );

    if (existingSessionIndex !== -1) {
      chatHistory[existingSessionIndex].messages = messages;
      chatHistory[existingSessionIndex].dateTime = dateTime;
    } else {
      if (!currentSessionName) {
        currentSessionName = generateChatNameFromFirstMessage(messages);
      }
      chatHistory.push({
        sessionId: selectedSessionId,
        name: currentSessionName,
        dateTime,
        messages,
      });
    }

    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }

  function loadChatHistory() {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      chatHistory = JSON.parse(savedHistory);
    }
  }

  function selectChatSession(sessionId) {
    selectedSessionId = sessionId;
    const selectedSession = chatHistory.find(
      (session) => session.sessionId === sessionId
    );
    if (selectedSession) {
      messages = selectedSession.messages;
    }
  }

  const toggleOptions = (sessionId, event) => {
    preventClose = true;
    const chatMenu = document.querySelector("#chat-menu");
    const chatItem = event.target.closest(".chat-item");
    const optionsDot = event.target.closest(".options-dot");
    if (openMenuId === sessionId) {
      chatItem.classList.remove("selected");
      optionsDot.classList.remove("selected");
      openMenuId = null;
    } else {
      if (openMenuId !== null) {
        const previousSelectedChatItem = document.querySelector(
          ".chat-item.selected"
        );
        const previousSelectedOptionsDot = document.querySelector(
          ".options-dot.selected"
        );
        if (previousSelectedChatItem) {
          previousSelectedChatItem.classList.remove("selected");
        }
        if (previousSelectedOptionsDot) {
          previousSelectedOptionsDot.classList.remove("selected");
        }
      }
      chatItem.classList.add("selected");
      optionsDot.classList.add("selected");
      openMenuId = sessionId;
      const buttonRect = event.target.getBoundingClientRect();
      menuPosition = {
        top: buttonRect.top + chatMenu.offsetTop - 140,
        left: buttonRect.left + buttonRect.width + window.scrollX - 40,
      };
    }
  };

  const startEditChatName = (sessionId) => {
    editingSessionId = sessionId;
    openMenuId = null;
    originalChatName =
      chatHistory.find((session) => session.sessionId === sessionId)?.name ||
      "";
  };

  const saveChatName = (sessionId, newName) => {
    if (!newName.trim()) {
      newName = originalChatName;
    }
    chatHistory = chatHistory.map((session) =>
      session.sessionId === sessionId ? { ...session, name: newName } : session
    );
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    editingSessionId = null;
  };

  const confirmDeleteChat = (sessionId) => {
    chatToDelete = sessionId;
    showModal = true;
  };

  const deleteChat = () => {
    chatHistory = chatHistory.filter(
      (session) => session.sessionId !== chatToDelete
    );
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    showModal = false;
    chatToDelete = null;
  };

  const closeModal = () => {
    showModal = false;
    chatToDelete = null;
  };

  const handleClickOutside = (event) => {
    if (!preventClose) {
      const menu = document.querySelector(".chat-options");
      if (menu && !menu.contains(event.target) && openMenuId) {
        const chatItem = document.querySelector(".chat-item.selected");
        const optionsDot = document.querySelector(".options-dot.selected");
        if (chatItem) chatItem.classList.remove("selected");
        if (optionsDot) optionsDot.classList.remove("selected");
        shouldAnimateOut = true;
        openMenuId = null;
      }
      if (editingSessionId && !event.target.closest(".edit-name-input")) {
        editingSessionId = null;
      }
    }
    preventClose = false;
  };

  const toggleSidebar = () => {
    sidebarOpen = !sidebarOpen;
  };

  const createNewChat = () => {
    const newChat = {
      sessionId: generateId(),
      name: "Nuevo chat",
      dateTime: new Date().toLocaleString("es-ES"),
      messages: [
        {
          id: generateId(),
          text: formatTextToHTML(
            "Hola! Cuéntame, ¿en qué puedo ayudarte hoy? 😊"
          ),
          sender: "bot",
          imageUrl: "",
        },
      ],
    };
    chatHistory = [newChat, ...chatHistory];
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    selectChatSession(newChat.sessionId);
    messages = newChat.messages;
    selectedSessionId = newChat.sessionId;
    currentSessionName = "";
  };

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
    document.addEventListener("mousedown", handleClickOutside);
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

  onDestroy(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
</script>

{#if !sidebarOpen}
  <div
    class="flex flex-row items-center justify-center fixed top-20 left-[1px] p-3 rounded-r-xl bg-white dark:bg-base-dark shadow-medium origin-left slide-animation-in"
  >
    <Tooltip
      text="Abrir barra lateral"
      position="-translate-x-6"
      origin="origin-top-left"
      delay="delay-150"
    >
      <button
        on:click={toggleSidebar}
        class="h-10 rounded-xl px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark"
      >
        <Sidebar />
      </button>
    </Tooltip>
    <Tooltip text="Nuevo chat" position="-translate-x-1/2" delay="delay-150">
      <button
        on:click={createNewChat}
        class="h-10 rounded-xl px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark"
      >
        <NewChat />
      </button>
    </Tooltip>
  </div>
{/if}

<div class="message-list-container flex-grow size-full min-h-[67.5vh] p-5">
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
        <li class="group flex flex-col mx-1 px-1 py-2 message {message.sender}">
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
      class="flex-grow py-2 px-5 mr-2 border-none outline-none bg-transparent text-base-color dark:text-base-color-dark"
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
  <div
    id="chat-menu"
    class="{sidebarOpen
      ? ''
      : 'closed'} transform transition-transform fixed left-0 top-0 sm:top-20 flex flex-col w-full min-w-64 sm:max-w-64 h-full sm:h-[calc(100%-80px)] items-start p-3 border border-gray-100/50 dark:border-base-full-dark-50 bg-white dark:bg-base-dark backdrop-blur backdrop-saturate-150 sm:rounded-r-xl shadow-medium font-motivasans text-base-color dark:text-base-color-dark z-[1000] sm:z-0"
  >
    <div class="flex items-center justify-between w-full h-10 mb-4">
      <Tooltip
        text="Cerrar barra lateral"
        position="-translate-x-6"
        origin="origin-top-left"
        delay="delay-150"
      >
        <button
          on:click={toggleSidebar}
          class="h-10 rounded-xl px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark"
        >
          <Sidebar />
        </button>
      </Tooltip>
      <Tooltip text="Nuevo chat" position="-translate-x-1/2" delay="delay-150">
        <button
          on:click={createNewChat}
          class="h-10 rounded-xl px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark"
        >
          <NewChat />
        </button>
      </Tooltip>
    </div>

    <div class="relative inner-scrollbar w-full h-full overflow-y-scroll">
      {#if chatHistory.length > 0}
        {#each chatHistory as session}
          <div
            class="chat-item group relative w-full p-2 gap-1 text-base-color-h dark:text-base-color-dark-h hover:text-base-color dark:hover:text-white hover:bg-gray-200 dark:hover:bg-base-full-dark rounded-xl overflow-hidden {session.sessionId ===
            selectedSessionId
              ? 'active'
              : ''}"
          >
            {#if editingSessionId === session.sessionId}
              <input
                type="text"
                class="edit-name-input w-full text-sm bg-transparent outline-none border-none"
                bind:value={session.name}
                on:blur={() => saveChatName(session.sessionId, session.name)}
                on:keydown={(e) => e.key === "Enter" && e.target.blur()}
              />
            {:else}
              <button
                on:click={() => selectChatSession(session.sessionId)}
                class="flex flex-col w-full text-sm"
              >
                <div class="w-full text-ellipsis text-start line-clamp-2">
                  {session.name}
                </div>
                <span
                  class="text-[10px] text-base-color-m dark:text-base-color-dark-m"
                >
                  {session.dateTime}
                </span>
                <div
                  class="absolute bottom-0 top-0 to-transparent right-0 bg-gradient-to-l from-white dark:from-base-dark group-hover:from-gray-200 dark:group-hover:from-base-full-dark w-12 from-0% group-hover:from-60% group-hover:w-12 group-[.selected]:from-60% group-[.selected]:from-gray-200 dark:group-[.selected]:from-base-full-dark group-[.active]:from-60% group-[.active]:from-gray-200 dark:group-[.active]:from-base-full-dark"
                ></div>
              </button>
            {/if}
            <div
              class="options-dot absolute bottom-0 top-0 items-center gap-1.5 pr-2 right-0 flex sm:hidden group-hover:flex group-[.selected]:flex group-[.active]:flex"
            >
              <button
                on:click={(event) => toggleOptions(session.sessionId, event)}
                class="button-options group flex items-center justify-center size-[18px] transition dark:hover:text-white"
                type="button"
                aria-haspopup="menu"
                aria-expanded={openMenuId === session.sessionId}
                data-state={openMenuId === session.sessionId
                  ? "open"
                  : "closed"}
              >
                <Dots />
              </button>
            </div>
          </div>
        {/each}
      {:else}
        <div class="h-full flex items-center justify-center px-2">
          <p class="text-base-color-h dark:text-base-color-dark-h text-center">
            Comienza una conversación para que tu historial aparezca aquí...
          </p>
        </div>
      {/if}
    </div>
    {#if openMenuId}
      <div
        class="origin-top-right sm:origin-top-left p-1 text-sm text-nowrap shadow-medium text-base-color-h dark:text-base-color-dark-h bg-white dark:bg-base-full-dark rounded-xl -translate-x-36 sm:translate-x-4 translate-y-40 sm:translate-y-0"
        style="top: {menuPosition.top}px; left: {menuPosition.left}px; position: absolute;"
        in:scale={{ duration: 250 }}
        out:scale={{ duration: 250 }}
        on:outstart={(e) =>
          shouldAnimateOut ? {} : e.stopImmediatePropagation()}
      >
        <div
          class="chat-options flex flex-col p-1"
          in:fade={{ duration: 250 }}
          out:fade={{ duration: 250 }}
          on:outstart={(e) =>
            shouldAnimateOut ? {} : e.stopImmediatePropagation()}
        >
          <button
            on:click={() => startEditChatName(openMenuId)}
            class="flex flex-row items-center gap-2 px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-base-dark rounded-xl transition duration-150"
          >
            <Edit />
            Cambiar el nombre
          </button>
          <button
            on:click={() => confirmDeleteChat(openMenuId)}
            class="flex flex-row items-center gap-2 px-2 py-1.5 text-bittersweet-500 dark:text-cerise-red-600 hover:bg-gray-200 dark:hover:bg-base-dark rounded-xl transition duration-150"
          >
            <Delete />
            Eliminar
          </button>
        </div>
      </div>
    {/if}
  </div>
</form>
{#if showModal}
  <button
    class="modal-backdrop fixed top-0 left-0 w-screen h-screen bg-black/50 z-[9998]"
    on:click={closeModal}
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 150 }}
  ></button>
  <div
    in:scale={{ duration: 150, start: 0.6 }}
    out:scale={{ duration: 150, start: 0.6 }}
    class="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base-color-h dark:text-base-color-dark-h bg-white dark:bg-base-dark rounded-2xl z-[9999] flex flex-col items-center"
  >
    <div
      class="flex items-center justify-between px-5 pb-5 pt-5 sm:p-6 border-b border-black/10 dark:border-white/10"
    >
      <h2 class="text-lg font-semibold leading-6">¿Deseas eliminar el chat?</h2>
    </div>
    <div class="flex-grow overflow-y-auto p-4 sm:p-6">
      <div class="flex flex-col gap-3 sm:flex-row-reverse">
        <button
          on:click={deleteChat}
          class="inline-flex flex-shrink-0 items-center justify-center px-4 py-2 leading-5 text-sm font-medium bg-cerise-red-600 hover:brightness-90 rounded-full"
          ><span>Eliminar</span>
        </button>
        <button
          on:click={closeModal}
          class="inline-flex flex-shrink-0 items-center justify-center px-4 py-2 leading-5 text-sm font-medium border border-white/10 hover:brightness-90 rounded-full"
          >Cancelar</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .inner-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .inner-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .inner-scrollbar-container {
    padding-right: 6px;
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
  .button-options {
    cursor: pointer;
  }

  .chat-item.selected,
  .chat-item.active {
    @apply bg-gray-200;
  }

  .chat-item.selected,
  .chat-item.active {
    @apply dark:bg-base-full-dark;
  }

  #chat-menu.closed {
    @apply -translate-x-full;
  }

  .slide-animation-in {
    animation: slide-in 0.3s ease;
  }

  @keyframes slide-in {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
