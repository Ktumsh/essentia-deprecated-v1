<script>
  import ArrowUp from "@/icons/svelte/arrow-up.svelte";

  export let handleSubmit;
  export let isSending;
</script>

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
  <slot></slot>
</form>
