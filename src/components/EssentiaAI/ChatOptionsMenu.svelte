<script>
  import { scale, fade } from "svelte/transition";
  import Edit from "@/icons/svelte/edit.svelte";
  import Delete from "@/icons/svelte/delete.svelte";

  export let menuPosition;
  export let openMenuId;
  export let shouldAnimateOut;
  export let startEditChatName;
  export let confirmDeleteChat;
</script>

{#if openMenuId}
  <div
    class="origin-top-right sm:origin-top-left p-1 text-sm text-nowrap shadow-medium text-base-color-h dark:text-base-color-dark-h bg-gradient-to-br from-white to-gray-100 dark:from-base-dark dark:to-base-full-dark border border-gray-200 dark:border-base-dark rounded-xl -translate-x-36 sm:translate-x-4 translate-y-40 sm:translate-y-0"
    style="top: {menuPosition.top}px; left: {menuPosition.left}px; position: absolute;"
    in:scale={{ duration: 250 }}
    out:scale={{ duration: 250 }}
    on:outstart={(e) => (shouldAnimateOut ? {} : e.stopImmediatePropagation())}
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
