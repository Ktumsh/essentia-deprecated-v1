<script>
  import { scale, fade } from "svelte/transition";
  export let showModal;
  export let closeModal;
  export let executeDelete;
  export let action;
</script>

{#if showModal}
  <button
    class="modal-backdrop fixed top-0 left-0 w-screen h-screen bg-black/80 z-[9998] cursor-default"
    on:click={closeModal}
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 150 }}
  ></button>
  <div
    in:scale={{ duration: 150, start: 0.6 }}
    out:scale={{ duration: 150, start: 0.6 }}
    class="modal grid gap-4 p-6 w-full max-w-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base-color dark:text-base-color-dark bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 rounded-lg z-[9999]"
  >
    <div class="flex flex-col space-y-2 text-center sm:text-left">
      <h2 class="text-lg font-semibold">¿Estás absolutamente seguro?</h2>
      <p class="text-sm text-base-color-m dark:text-base-color-dark-m">
        {action === "all"
          ? "Esto eliminará permanentemente su historial de chat y eliminará sus datos de nuestros servidores."
          : "Esto eliminará permanentemente su mensaje de chat y eliminará sus datos de nuestros servidores."}
      </p>
    </div>
    <div class="flex-grow overflow-y-auto">
      <div class="flex flex-col gap-3 sm:flex-row-reverse">
        <button
          on:click={executeDelete}
          class="inline-flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm text-white bg-bittersweet-400 dark:bg-cerise-red-600 hover:brightness-90 rounded-md transition"
          ><span>Eliminar</span>
        </button>
        <button
          on:click={closeModal}
          class="inline-flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-md transition"
          >Cancelar
        </button>
      </div>
    </div>
  </div>
{/if}
