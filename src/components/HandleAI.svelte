<script>
  import { onMount, onDestroy } from "svelte";
  import SidebarToggle from "@/components/EssentiaAI/SidebarToggle.svelte";
  import ChatList from "@/components/EssentiaAI/ChatList.svelte";
  import MessageList from "@/components/EssentiaAI/MessageList.svelte";
  import MessageInput from "@/components/EssentiaAI/MessageInput.svelte";
  import ChatOptionsMenu from "@/components/EssentiaAI/ChatOptionsMenu.svelte";
  import DeleteChatModal from "@/components/EssentiaAI/DeleteChatModal.svelte";
  import { getCohereStream } from "@/services/ia";

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
  let startX;
  const threshold = 80;

  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    if (!startX) return;
    let touch = event.touches[0];
    let diffX = touch.clientX - startX;

    if (diffX > threshold && !sidebarOpen) {
      sidebarOpen = true;
    }

    if (diffX < -threshold && sidebarOpen) {
      sidebarOpen = false;
    }
  }

  function handleTouchEnd() {
    startX = null;
  }

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

<SidebarToggle {toggleSidebar} {createNewChat} {sidebarOpen} />

<MessageList {messages} {loading} />

<MessageInput {handleSubmit} {isSending}>
  <ChatList
    {chatHistory}
    {selectedSessionId}
    {editingSessionId}
    {openMenuId}
    {selectChatSession}
    {toggleOptions}
    {startEditChatName}
    {saveChatName}
    {confirmDeleteChat}
    {sidebarOpen}
    {handleTouchStart}
    {handleTouchMove}
    {handleTouchEnd}
    {toggleSidebar}
    {createNewChat}
  >
    <ChatOptionsMenu
      {menuPosition}
      {openMenuId}
      {shouldAnimateOut}
      {startEditChatName}
      {confirmDeleteChat}
    />
  </ChatList>
</MessageInput>

<DeleteChatModal {showModal} {deleteChat} {closeModal} />

<style>
  button:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  .button-options {
    cursor: pointer;
  }
</style>
