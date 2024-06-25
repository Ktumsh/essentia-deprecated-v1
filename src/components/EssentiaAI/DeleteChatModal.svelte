<script>
  import { scale, fade } from "svelte/transition";
  export let showModal;
  export let deleteChat;
  export let closeModal;
</script>

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
    class="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base-color dark:text-base-color-dark bg-white dark:bg-base-dark rounded-2xl z-[9999] flex flex-col items-center"
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
          class="inline-flex flex-shrink-0 items-center justify-center px-4 py-2 leading-5 text-sm text-white font-medium bg-bittersweet-500 dark:bg-cerise-red-600 hover:brightness-90 rounded-full"
          ><span>Eliminar</span>
        </button>
        <button
          on:click={closeModal}
          class="inline-flex flex-shrink-0 items-center justify-center px-4 py-2 leading-5 text-sm font-medium border border-black/10 dark:border-white/10 hover:brightness-90 rounded-full"
          >Cancelar
        </button>
      </div>
    </div>
  </div>
{/if}
