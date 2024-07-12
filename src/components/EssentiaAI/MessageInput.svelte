<script>
  import ArrowUp from "@/icons/svelte/arrow-up.svelte";
  import Link from "@/icons/svelte/link.svelte";

  export let handleSubmit;
  export let isSending;
  export let scrollToBottom; // Recibir la función scrollToBottom como prop
  export let showScrollButton; // Recibir el estado de visibilidad del botón como prop
</script>

<div
  class="w-full fixed inset-x-0 bottom-0 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] transition-[padding]"
>
  <button
    class="group/button flex items-center justify-center h-9 w-9 absolute top-0 right-4 sm:right-8 rounded-md shadow-sm text-base-color dark:text-base-color-dark hover:text-bittersweet-400 dark:hover:text-cerise-red-600 bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 hover:border-bittersweet-400 dark:hover:border-cerise-red-600 transition z-10"
    style="opacity: {showScrollButton ? 1 : 0}"
    on:click={scrollToBottom}
  >
    <ArrowUp
      className="size-4 rotate-[135deg] group-hover/button:rotate-180 transition-transform"
    />
    <span class="sr-only">Scroll to bottom</span>
  </button>
  <div class="mx-auto max-w-2xl sm:px-4 lg:pr-4 lg:pl-2">
    <div
      class="bg-white dark:bg-base-dark space-y-4 border-t px-4 py-2 shadow-md sm:rounded-t-xl sm:border border-gray-200 dark:border-white/10 md:py-4"
    >
      <form
        on:submit|preventDefault={handleSubmit}
        class="message-input-container font-dmsans"
      >
        <div
          class="relative flex items-center justify-center size-full bg-white dark:bg-base-dark sm:border border-gray-200 dark:border-white/10 sm:rounded-md"
        >
          <input
            id="message-input"
            autocomplete="off"
            class="flex-grow min-h-[60px] py-2 px-5 mr-2 sm:text-sm border-none outline-none bg-transparent text-base-color dark:text-base-color-dark"
            placeholder="Escribe tu mensaje."
          />
          <button
            id="send-btn"
            type="submit"
            class="absolute right-0 top-[13px] sm:right-4 flex items-center justify-center size-9 mx-2 shadow-md disabled:opacity-60 disabled:pointer-events-none bg-bittersweet-400 dark:bg-cerise-red-600 text-white dark:text-base-dark rounded-full hover:brightness-90 text-sm"
            disabled={isSending}
          >
            <ArrowUp />
          </button>
        </div>
        <slot></slot>
      </form>
      <p
        class="text-base-color-d dark:text-base-color-dark-d px-2 text-center text-xs leading-normal hidden sm:block font-dmsans"
      >
        Impulsado por el modelo
        <a
          href="https://cohere.com/command"
          target="_blank"
          class="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
        >
          <span>command-r-plus</span>
          <Link />
        </a>
        de
        <a
          href="https://cohere.com/"
          target="_blank"
          class="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
        >
          <span>Cohere</span>
          <Link />
        </a>.
      </p>
    </div>
  </div>
</div>
