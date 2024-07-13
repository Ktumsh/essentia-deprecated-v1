<script>
  import Dots from "@/icons/svelte/dots.svelte";
  import Tooltip from "./Tooltip.svelte";
  import Sidebar from "@/icons/svelte/sidebar.svelte";
  import NewChat from "@/icons/svelte/new-chat.svelte";
  import Chat from "@/icons/svelte/chat.svelte";
  import Edit from "@/icons/svelte/edit.svelte";

  export let chatHistory;
  export let selectedSessionId;
  export let editingSessionId;
  export let openMenuId;
  export let selectChatSession;
  export let toggleOptions;
  export let saveChatName;
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
    : 'closed'} peer transform transition-transform absolute left-0 inset-y-0 lg:top-20 flex flex-col w-[300px] h-full lg:h-[calc(100%-80px)] items-start p-3 border-l-0 border border-gray-200 dark:border-white/10 bg-white dark:bg-base-dark backdrop-blur backdrop-saturate-150 lg:rounded-tr-xl font-motivasans text-base-color dark:text-base-color-dark z-[1000] lg:z-10"
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
>
  <div class="flex items-center justify-between w-full h-10 mb-4">
    <Tooltip
      text="Cerrar barra lateral"
      position="-translate-x-6"
      origin="origin-top-left"
      delay="delay-300"
    >
      <button
        on:click={toggleSidebar}
        class="h-10 rounded-xl px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark transition-colors duration-150"
      >
        <Sidebar />
      </button>
    </Tooltip>
    <Tooltip text="Nuevo chat" position="-translate-x-1/2" delay="delay-300">
      <button
        on:click={createNewChat}
        class="h-10 rounded-xl px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark transition-colors duration-150"
      >
        <NewChat />
      </button>
    </Tooltip>
  </div>

  <div
    class="relative flex flex-col inner-scrollbar w-full h-full gap-1.5 overflow-y-auto"
  >
    {#if chatHistory.length > 0}
      {#each chatHistory as session}
        <div
          class="chat-item group relative w-full gap-1 text-base-color-h dark:text-base-color-dark-h hover:text-base-color dark:hover:text-white hover:bg-gray-100 dark:hover:bg-base-full-dark rounded-lg transition-colors duration-150 overflow-hidden {session.sessionId ===
          selectedSessionId
            ? 'active bg-gray-200 dark:bg-base-full-dark'
            : ''}"
        >
          {#if editingSessionId === session.sessionId}
            <div
              class="absolute left-2 top-1 flex size-6 items-center justify-center"
            >
              <Edit
                className="size-4 mr-2 mt-2 text-base-color-d dark:text-base-color-dark-d"
              />
            </div>
            <!-- svelte-ignore a11y-autofocus -->
            <input
              autofocus
              type="text"
              class="edit-name-input px-8 py-2 w-full text-sm bg-gray-200 dark:bg-base-full-dark outline-bittersweet-400 dark:outline-cerise-red-600 rounded-lg"
              bind:value={session.name}
              on:blur={() => saveChatName(session.sessionId, session.name)}
              on:keydown={(e) => e.key === "Enter" && e.target.blur()}
            />
          {:else}
            <div
              class="absolute left-2 top-1 flex size-6 items-center justify-center"
            >
              <Chat
                className="size-4 mr-2 mt-2 text-base-color-d dark:text-base-color-dark-d"
              />
            </div>
            <button
              on:click={() => selectChatSession(session.sessionId)}
              class="inline-flex flex-col justify-center w-full text-sm px-8 py-2 pr-10 whitespace-nowrap font-dmsans font-semibold"
            >
              <div
                title={session.name}
                class="w-full relative flex-1 max-h-5 text-start text-ellipsis overflow-hidden break-all select-none"
              >
                <span class="whitespace-nowrap">
                  <span>
                    {session.name}
                  </span>
                </span>
              </div>
              <span
                class="text-[10px] text-base-color-m dark:text-base-color-dark-m"
              >
                {session.dateTime}
              </span>
              <div
                class="absolute bottom-0 top-0 to-transparent right-0 bg-white dark:bg-base-dark group-hover:gray-200 dark:group-hover:bg-base-full-dark group-[.active]:bg-gray-200 dark:group-[.active]:bg-base-full-dark"
              ></div>
            </button>
          {/if}
          <div
            class="options-dot absolute bottom-0 top-0 items-center gap-1.5 px-2 right-0 flex opacity-0 group-hover:opacity-100 group-[.selected]:opacity-100 group-[.active]:opacity-100 transition-opacity duration-150"
          >
            <button
              on:click={(event) => toggleOptions(session.sessionId, event)}
              class="button-options group flex items-center justify-center size-[18px] dark:hover:text-white"
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
