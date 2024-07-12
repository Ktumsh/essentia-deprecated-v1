<script>
  import Dots from "@/icons/svelte/dots.svelte";
  import Tooltip from "./Tooltip.svelte";
  import Sidebar from "@/icons/svelte/sidebar.svelte";
  import NewChat from "@/icons/svelte/new-chat.svelte";

  export let chatHistory;
  export let selectedSessionId;
  export let editingSessionId;
  export let openMenuId;
  export let selectChatSession;
  export let toggleOptions;
  export let startEditChatName;
  export let saveChatName;
  export let confirmDeleteChat;
  export let confirmDeleteAllChats;
  export let sidebarOpen;
  export let handleTouchStart;
  export let handleTouchMove;
  export let handleTouchEnd;
  export let toggleSidebar;
  export let createNewChat;
</script>

<div
  id="chat-menu"
  data-state={sidebarOpen ? "open" : "closed"}
  class="{sidebarOpen
    ? 'open'
    : 'closed'} peer transform transition-transform absolute left-0 inset-y-0 lg:top-20 flex flex-col w-[300px] h-full lg:h-[calc(100%-80px)] items-start p-3 border-l-0 border border-gray-200 dark:border-white/10 bg-white dark:bg-base-dark backdrop-blur backdrop-saturate-150 sm:rounded-tr-xl font-motivasans text-base-color dark:text-base-color-dark z-[1000]"
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
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

  <div class="relative inner-scrollbar w-full h-full overflow-y-auto">
    {#if chatHistory.length > 0}
      {#each chatHistory as session}
        <div
          class="chat-item group relative w-full gap-1text-base-color-h dark:text-base-color-dark-h hover:text-base-color dark:hover:text-white hover:bg-gray-200 dark:hover:bg-base-full-dark rounded-xl overflow-hidden {session.sessionId ===
          selectedSessionId
            ? 'active bg-gray-200 dark:bg-base-full-dark'
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
              class="flex flex-col w-full text-sm p-2"
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
                class="absolute bottom-0 top-0 to-transparent right-0 bg-gradient-to-l from-white dark:from-base-dark group-hover:from-gray-200 dark:group-hover:from-base-full-dark w-12 from-0% group-hover:from-60% group-hover:w-12 group-[.selected]:from-60% group-[.active]:from-60% group-[.active]:from-gray-200 dark:group-[.active]:from-base-full-dark"
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
              data-state={openMenuId === session.sessionId ? "open" : "closed"}
            >
              <Dots />
            </button>
          </div>
        </div>
      {/each}
    {:else}
      <div class="h-full flex items-center justify-center px-2">
        <p
          class="text-base-color-d dark:text-base-color-dark-d text-center text-sm"
        >
          Sin historial de chat
        </p>
      </div>
    {/if}
  </div>
  <div class="flex items-center justify-end w-full h-10 mt-4">
    <button
      on:click={confirmDeleteAllChats}
      disabled={chatHistory.length === 0}
      class="h-10 rounded-xl px-3 font-medium text-sm text-base-color-h dark:text-base-color-dark-h disabled:pointer-events-none disabled:opacity-50"
    >
      Limpiar historial
    </button>
  </div>
  <slot></slot>
</div>

<style>
  .inner-scrollbar::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background: transparent;
  }

  .inner-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .inner-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .inner-scrollbar-container {
    padding-right: 3px;
  }

  #chat-menu.closed {
    @apply -translate-x-full;
  }

  #chat-menu.open {
    @apply translate-x-0;
  }

  #chat-menu.closed {
    @apply -translate-x-full;
  }
</style>
